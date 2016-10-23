# -*- coding: utf-8 -*-
from flask import * 
import pandas as pd
import requests
import json
import io
URL="gastos.csv"

app = Flask(__name__)
def download():
    r = requests.get("http://www.ige.eu/igebdt/igeapi/datos/464")
    f = io.open("gastos.csv", 'w+', encoding="iso-8859-1")
    f.write(r.text)
    f.close()
    

@app.route("/gasto/total/<region>")
def total(region):
    df = pd.read_csv(URL)
    df['Espazo']=map(lambda x: x[x.index(" ")+1:], df['Espazo'])
    cols = list(df.keys())
    cols[0]='tipo'
    df.columns = cols
    keys = df.keys()

    try:
        fromYear = int(request.args.get('fromYear'))
    except:
        fromYear=1
    try:
        toYear = int(request.args.get('toYear'))
    except:
        toYear=2014

    if region == 'Corunha':
       region = ((str('A Coruña')).decode('utf-8')).encode('iso-8859-1')

    if region not in list(df.Espazo.unique()):
        return "Error in region"


    df=df[(df.Tempo >= fromYear) & (df.Tempo <= toYear)]
    df = df[df[keys[0]] == 'Total compras e gastos (miles de euros)']

    groupByYear = df.groupby(df.Tempo)
    resp = []
    for i in groupByYear:
        key, dfyear = i
        dicc = {"anho":key, "valores":[]}
        aux = dfyear[dfyear.Espazo == region]
        keys = aux.keys()
        valoresList = [{'total': row['DatoN']} for index,row in aux.iterrows()]
        dicc["valores"]=valoresList
        resp.append(dicc)
            
    return json.dumps(resp, ensure_ascii=False), 200, {'Content-Type': 'text/json; charset=iso-8859-1'}

@app.route("/gasto/<region>")
def defunciones(region):
    df = pd.read_csv(URL,encoding='iso-8859-1')
    df['Espazo']=map(lambda x: x[x.index(" ")+1:], df['Espazo'])
    cols = list(df.keys())
    cols[0]='tipo'
    df.columns = cols

    try:
        fromYear = int(request.args.get('fromYear'))
    except:
        fromYear=1
    try:
        toYear = int(request.args.get('toYear'))
    except:
        toYear=2014

    if region == 'Corunha':
       region = unicode("A Coruña", "utf-8") 

    if region not in list(df.Espazo.unique()):
        return "Error in region"

    df=df[(df.Tempo >= fromYear) & (df.Tempo <= toYear)]
    groupByYear = df.groupby(df.Tempo)
    resp = []
    for i in groupByYear:
        key, dfyear = i
        dicc = {"anho":key, "valores":[]}
        aux = dfyear[dfyear.Espazo == region]
        keys = aux.keys()
        valoresList = [{keys[0]:row[keys[0]], 'valor': row['DatoN']} for index,row in aux.iterrows()]
        dicc["valores"]=valoresList
        resp.append(dicc)

    return json.dumps(resp, ensure_ascii=False), 200, {'Content-Type': 'text/json; charset=utf-8'}

if __name__ == "__main__":
    download()
    app.run(host='0.0.0.0', debug=True)
