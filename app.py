import os
from flask import Flask
from flask import render_template
from flask.ext.scss import Scss

app = Flask(__name__)

app.debug = True


Scss(app, static_dir='static/css', asset_dir='assets/scss')


@app.route('/')
def hello():
    return render_template('index.html', name="turtlea")

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
