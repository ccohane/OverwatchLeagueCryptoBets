#!usr/bin/env python3

from flask import Flask, render_template, request, redirect, session, jsonify, url_for, escape
import datetime, time

app = Flask(__name__)

@app.route('/')
def index():
    return redirect("/stages")

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if request.method == 'GET':
        return render_template('dashboard.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'GET':
        return render_template('profile.html')

@app.route('/admin', methods=['GET'])
def admin():
    if request.method == 'GET':
        return render_template('admin.html')

@app.route('/stages', methods=['GET'])
def stages():
    if request.method == 'GET':
        return render_template('stages.html')

@app.route('/stage1', methods=['GET'])
def stage1():
    if request.method == 'GET':
        return render_template('stage1.html')



if __name__ == "__main__":
    #FIXME change the following server setings from 127.1 to 0.0.0.0
    app.run(host="127.1", port="5001", debug=True)
    #app.run(host="0.0.0.0" ,port="1996",debug=True)
