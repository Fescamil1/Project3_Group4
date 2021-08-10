import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import or_

from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
import datetime as dt

#################################################

Base = automap_base()

# Database Setup
engine = create_engine(
    'postgresql://postgres:postgres#@localhost:5432/weathermap')
connection = engine.connect()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the tables

Weathermap = Base.classes.weatherhist
Weather_summary = Base.classes.SummaryView


# Create our session (link) from Python to the DB
session = Session(engine)

# Close session
session.close()

# Flask Setup
app = Flask(__name__)


@app.route("/")
def home_page():
    """List all available api routes."""
    return (
        f"<br/>"
        f"/api/v1.0/weatherhist<br/>"
        f"<br/>"
        f"<br/>"
        f"/api/v1.0/SummaryView<br/>"
        f"<br/>"
    )

@app.route("/api/v1.0/weatherhist")
def weatherhist():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    
    # Query  
    api_layout = session.query(Weathermap.city, Weathermap.type, Weathermap.severity, Weathermap.lat, Weathermap.lng, Weathermap.duration,Weathermap.eventid).order_by(Weathermap.city).all()

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

    return jsonify(all_weather_list)


@app.route("/api/v1.0/SummaryView")
def SummaryView():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    
    # Query
    api_map = session.query(Weather_summary.year, Weather_summary.city, Weather_summary.type, Weather_summary.duration, Weather_summary.avg_perc_year, Weather_summary.lat, Weather_summary.lng)
    
    # .filter(or_(Weathermap.state == "TX", Weathermap.state == "CA",\
    # Weathermap.state == "AZ", Weathermap.state == "IL", Weathermap.state == "NY", Weathermap.state == "PA")).order_by(Weathermap.city).\
    # group_by(Weathermap.city, Weathermap.state, Weathermap.lat, Weathermap.lng).all()
    
    session.close()

    # To create a dictionary
    all_summary_view_list = []
    for year, city, type, duration, avg_perc_year, lat, lng in api_map:
        us_summary_view = {}
        us_summary_view["year"] = year
        us_summary_view["type"] = city
        us_summary_view["type"] = type
        us_summary_view["duration"] = float(duration)
        us_summary_view["avg_perc_year"] = float(avg_perc_year)
        us_summary_view["lat"] = float(lat)
        us_summary_view["lng"] = float(lng)
        all_summary_view_list.append(us_summary_view)

    return jsonify(all_summary_view_list)

if __name__ == '__main__':
    app.run(debug=True)

