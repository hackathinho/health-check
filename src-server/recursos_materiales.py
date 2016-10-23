# -*- coding:utf-8 -*-

import pandas as pd
import numpy as np

#TODO falta el get
#http://www.ige.eu/igebdt/igeapi/datos/369/

datos = pd.read_csv('recursos.csv')
#datos = pd.read_csv('recursos_def.csv', encoding='latin1')
#datos = pd.read_csv('http://www.ige.eu/igebdt/igeapi/datos/369/', encoding='iso-8859-1')
datos.Espazo = datos.Espazo.apply(lambda x: x[(x.index(" ")+1):])


def f_or(x,y):
    return x|y

def f_and(x,y):
    return x&y


def filtrar(tempo=None, codTempo=None, recursos=None, codRegion=None, region=None, dato=None):
    indices = []
    parciales = []

    if tempo is not None:
        try:
            i = [datos['Tempo'] == t for t in tempo]
            indices = indices + i
        except TypeError:
            i = [datos['Tempo'] == tempo]
            indices = indices + i
    else:
        i = [pd.Series([True]*800)]
        indices = indices + i
    parciales.append(reduce(f_or, indices, False))

    if codTempo is not None:
        try:
            i = [datos['CodTempo'] == cod for cod in codTempo]
            indices = indices + i
        except TypeError:
            i = [datos['CodTempo'] == codTempo]
            indices = indices + i
    else:
        i = [pd.Series([True]*800)]
        indices = indices + i
    parciales.append(reduce(f_or, indices, False))

    indices = []
    if recursos is not None:
        try:
            i = [datos['Recursos materiais'] == rec for rec in recursos]
            indices = indices + i
        except TypeError:
            i = [datos['Recursos materiais'] == recursos]
            indices = indices + i
    else:
        i = [pd.Series([True]*800)]
        indices = indices + i
    parciales.append(reduce(f_or, indices, False))

    indices = []
    if codRegion is not None:
        try:
            i = [datos['CodEspazo'] == es for es in codRegion]
            indices = indices + i
        except TypeError:
            i = [datos['CodEspazo'] == codRegion]
            indices = indices + i
    else:
        i = [pd.Series([True]*800)]
        indices = indices + i
    parciales.append(reduce(f_or, indices, False))

    indices = []
    if region is not None:
        try:
            i = [datos['Espazo'] == es for es in region]
            indices = indices + i
        except TypeError:
            i = [datos['Espazo'] == region]
            indices = indices + i
    else:
        i = [pd.Series([True]*800)]
        indices = indices + i
    parciales.append(reduce(f_or, indices, False))

    indices = []
    if dato is not None:
        try:
            i = [datos['DatoN'] == d for d in dato]
            indices = indices + i
        except TypeError:
            i = [datos['DatoN'] == dato]
            indices = indices + i
    else:
        i = [pd.Series([True]*800)]
        indices = indices + i
    parciales.append(reduce(f_or, indices, False))

    final = reduce(f_and, parciales, True)
    #return datos[final]
    return datos[final].to_json(force_ascii=False)








