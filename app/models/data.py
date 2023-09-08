from models.connexion import MongoAccess


class Data:
    @classmethod
    def get_one_publication(cls):
        collection = MongoAccess.connexion()
        resultat = collection.find_one()
        MongoAccess.deconnexion()
        return resultat

    @classmethod
    def get_all_publications(cls):
        collection = MongoAccess.connexion()
        resultat = list(collection.find())
        MongoAccess.deconnexion()
        return resultat

    @classmethod
    def noms(cls):
        collection = MongoAccess.connexion()
        authors = collection.distinct('authors')
        MongoAccess.deconnexion()
        return authors

    @classmethod
    def titres(cls):
        collection = MongoAccess.connexion()
        authors = collection.distinct('title')
        MongoAccess.deconnexion()
        return authors

    @classmethod
    def recherche_par_titre(cls, titre):
        collection = MongoAccess.connexion()
        titres = list(collection.find({'title': titre}))
        MongoAccess.deconnexion()
        return titres

    @classmethod
    def recherche_par_nom(cls, authors):
        collection = MongoAccess.connexion()
        authors = str(authors)
        articles_by_authors = list(collection.find({'authors': authors}))
        MongoAccess.deconnexion()
        return articles_by_authors

    @classmethod
    def recherche_par_annee(cls, year):
        collection = MongoAccess.connexion()
        year = int(year)
        years = list(collection.find({'year': year}))
        MongoAccess.deconnexion()
        return years