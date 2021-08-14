import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
# from sqlalchemy import or_

from flask import Flask, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
import datetime as dt
from flask_cors import CORS
#################################################

# Database Setup
engine = create_engine(
    'postgresql://postgres:postgres@localhost:5432/weather_db')
connection = engine.connect()

Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the tables

Weathermap = Base.classes.weatherhist
Summaryview = Base.classes.summaryview

# Create our session (link) from Python to the DB
session = Session(engine)

# Close session
session.close()

# Flask Setup
app = Flask(__name__)
CORS(app)


@app.route("/")
def home_page():
    """List all available api routes."""
    return (
        f"<br/>"
        f"/api/v1.0/weatherhist<br/>"
        f"<br/>"
        f"<br/>"
        f"/api/v1.0/summaryview<br/>"
        f"<br/>"
    )


@app.route("/api/v1.0/weatherhist", methods=['GET'])
def weatherhist_func():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query
    api_layout = session.query(Weathermap.city, Weathermap.type, Weathermap.severity, Weathermap.lat,
                               Weathermap.lng, Weathermap.duration, Weathermap.eventid).order_by(Weathermap.city).all()

    session.close()

    # To create a dictionary
    all_weather_list = []
    for city, type, severity, lat, lng, duration, eventid in api_layout:
        weather_dict = {}
        weather_dict["city"] = city
        weather_dict["type"] = type
        weather_dict["severity"] = severity
        weather_dict["lat"] = float(lat)
        weather_dict["lng"] = float(lng)
        weather_dict["duration"] = float(duration)
        weather_dict["eventid"] = eventid
        all_weather_list.append(weather_dict)

    response = jsonify(all_weather_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/api/v1.0/summaryview")
def summaryview_func():
    # Create our session (link) from Python to the DB

    session = Session(engine)

    # Query
    api_map = session.query(Summaryview.index, Summaryview.year, Summaryview.city, Summaryview.type, Summaryview.duration,
                            Summaryview.avg_perc_year, Summaryview.lat, Summaryview.lng).all()

    session.close()

    # To create a dictionary
    all_summary_view_list = []
    for index, year, city, type, duration, avg_perc_year, lat, lng, in api_map:
        us_summary_view = {}
        us_summary_view["index"] = index
        us_summary_view["year"] = year
        us_summary_view["city"] = city
        us_summary_view["type"] = type
        us_summary_view["duration"] = float(duration)
        us_summary_view["avg_perc_year"] = float(avg_perc_year)
        us_summary_view["lat"] = float(lat)
        us_summary_view["lng"] = float(lng)
        all_summary_view_list.append(us_summary_view)

    response = jsonify(all_summary_view_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(debug=True)
