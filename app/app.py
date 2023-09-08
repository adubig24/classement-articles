from flask import Flask, render_template, request, jsonify
from models.data import Data

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_one_article')
def get_one_article():
    articles = Data.get_one_publication()
    return jsonify(articles)

@app.route('/get_all_articles')
def get_all_articles():
    page = int(request.args.get('page', 1))
    per_page = 113529

    articles = Data.get_all_publications()
    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    paginated_articles = articles[start_index:end_index]
    return jsonify(paginated_articles)

@app.route('/get_articles_by_authors')
def get_articles_by_authors():
    articlesByauthor = Data.recherche_par_nom_all()
    return jsonify(articlesByauthor)

@app.route('/get_articles_by_year')
def get_articles_by_year():
    year = request.args.get('year')
    print("Year from request:", year)
    years = Data.recherche_par_annee(year)
    return jsonify(years)

@app.route('/get_authors_list')
def get_authors_list():
    authors_list = Data.noms()
    return jsonify(authors_list)


if __name__=='__main__':
    app.run(debug=True)




# @app.route('/')
# def index():
#     publi = Data.get_one_publication()
#     return render_template('index.html', publi=publi)
#
#
# @app.route('/')
# def recherche():
#     articles = Data.get_all_publications()# Récupère tous les articles
#     return render_template('recherche.html', articles=articles)