from flask import render_template, url_for, flash, redirect, request, jsonify, session
from flask.views import MethodView
from flask_login import current_user, login_manager, LoginManager, login_user, logout_user, login_required
from flask_cors import cross_origin
from timesheets import app, db
from timesheets.forms import LoginForm
from timesheets.models import User, Consultant, ITTechnician, FinanceTeamMember, LineManager, Timesheet
from datetime import datetime


class HomeView(MethodView):
    def get(self):
        return "Done", 202


class CurrentUserView(MethodView):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "Unauthorised"}), 401
        user = Consultant.query.filter_by(id=user_id).first()
        return jsonify({"id": user.id, "email": user.username})


class LoginView(MethodView):
    def post(self):
        username = request.json["username"]
        password = request.json["password"]
        consultant = Consultant.query.filter_by(username=username).first()

        if consultant is None or password != consultant.password:
            return jsonify({"Error": "Unauthorised or Password incorrect"})

        session["user_id"] = consultant.id

        print("Logged in: ", session.get("user_id"))

        return jsonify({"id": consultant.id, "username": consultant.username})


class TimesheetView(MethodView):
    def get(self, timesheet_id):
        user_id = session.get("user_id")
        timesheet = Timesheet.query.filter_by(id=timesheet_id, consultant_id=user_id).first()
        if timesheet is None:
            return jsonify({"Error": "Unauthorized"}), 403
        return jsonify({"id": timesheet.id, "start_work_time": timesheet.start_work_time, "end_work_time": timesheet.end_work_time})
    
    def post(self):
        user_id = session.get("user_id")

        print("Creating timesheet: ", user_id)

        if not user_id:
            return jsonify({"Error": "Unauthorised"}), 401

        consultant = Consultant.query.filter_by(id=user_id).first()
        if consultant is None:
            return jsonify({"Error": "Consultant not found"}), 404

        timesheet = Timesheet(
            consultant_name=f"{consultant.firstname} {consultant.lastname}",
            start_work_time=request.json["start_time"],
            end_work_time=request.json["end_time"],
            hours_worked=0,
            week_start_date=datetime.utcnow(),
            consultant_id=user_id,
            status="pending",
        )
        db.session.add(timesheet)
        db.session.commit()
        return jsonify({"id": timesheet.id})
    
    def put(self, timesheet_id):
        pass
    
    def delete(self, timesheet_id):
        user_id = session.get("user_id")
        Timesheet.query.filter_by(id=timesheet_id, consultant_id=user_id).delete()
        db.session.commit()
        return jsonify("Timesheet deleted"), 200



class ListTimesheetsView(MethodView):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"Error": "Unauthorised"}), 401
        timesheets = Timesheet.query.filter_by(consultant_id=user_id).all()
        json_dict = {}
        timesheet_ids = [timesheet.id for timesheet in timesheets]
        for timesheet in timesheets:
            json_dict[timesheet.id] = {"name": timesheet.consultant_name, "status": timesheet.status}
        return jsonify(json_dict)

class LineManagerView(MethodView):
    def get(self):
        user_id = session.get("user_id")
        consultants = Consultant.query.filter_by(line_manager_id=user_id)
        json_dict = {}
        for consultant in consultants:
            json_dict[consultant.id] = consultant.username 
        return jsonify(json_dict)
    


class LogoutView(MethodView):
    def get(self):
        session.pop("user_id", None)
        return "Logged out successfully", 200


class CreateUserView(MethodView):
    def get(self):
        # Your user creation logic here
        return "<h1>User creation page</h1>"


# Registering the views
timesheets_view = TimesheetView.as_view("timesheet_view")
app.add_url_rule("/", view_func=HomeView.as_view("home_view"))
app.add_url_rule("/@me", view_func=CurrentUserView.as_view("current_user_view"))
app.add_url_rule("/login", view_func=LoginView.as_view("login_view"), methods=["POST"])
app.add_url_rule("/create_timesheet", view_func=timesheets_view, methods=["POST"])
app.add_url_rule("/view_timesheet/<timesheet_id>", view_func=timesheets_view, methods=["GET"])
app.add_url_rule("/delete_timesheet/<timesheet_id>", view_func=timesheets_view, methods=["DELETE"])
app.add_url_rule("/list_timesheets", view_func=ListTimesheetsView.as_view("list_timesheets_view"), methods=["GET"])
app.add_url_rule("/logout", view_func=LogoutView.as_view("logout_view"))
app.add_url_rule("/create_user", view_func=CreateUserView.as_view("create_user_view"))