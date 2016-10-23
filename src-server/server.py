#!/usr/bin/python
# -*- coding: utf-8 -*-

import pandas as pd 
from flask import Flask,request
# -- defunciones --
print "-- cargamos defunciones --"
defuncionesdf = pd.read_csv("http://www.ige.eu/igebdt/igeapi/datos/880",encoding="iso-8859-1")
defuncionesdf.Espazo = defuncionesdf.Espazo.apply(lambda x: x[(x.index(" ")+1):])

def filtra_primer_valor(str_idade):
    try:
        return str_idade[0:str_idade.index(" ")]
    except ValueError:
        return str_idade
defuncionesdf.Idade = defuncionesdf.Idade.apply(lambda x: filtra_primer_valor(x))

app = Flask(__name__)

def year_filter(str_from,str_to):
    try:
        from_year = int(str_from)
        to_year = int(str_to) 
    except:
        from_year= 1988
        to_year = 2015
    return from_year,to_year

@app.route("/defunciones/<region>/<poblacion>",methods=['POST', 'GET'])
def defunciones(region,poblacion):
    df = defuncionesdf
    if poblacion not in list(df.Sexo.unique()):
        return "Error poblacion: "+str(list(df.Sexo.unique()))
    if region not in list(df.Espazo.unique()):
        return "Error region, parametros:"+str(list(df.Espazo.unique()))
    if region == "Corunha":
        region = "A Coruña"
    idade = request.args.get('idade')
    idade = "Total" if idade is None or (not idade.isdigit() and idade != "Total") else idade 
    from_year,to_year = year_filter(request.args.get('fromYear'),request.args.get('toYear'))
    filtered = df[(df.Tempo <= to_year) & (df.Tempo >=from_year) & (df.Sexo == poblacion) & (df.Espazo == region) & (df.Idade==idade)]
    return filtered.to_json(force_ascii=False)

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug =True)

