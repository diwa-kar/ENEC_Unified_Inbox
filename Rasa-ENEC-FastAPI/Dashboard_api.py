# Importing necessary libraries
import xmltodict
import uvicorn

from fastapi import FastAPI,File,UploadFile,Form
import pandas as pd
# from fastapi import jsonify

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request,Response
from fastapi.encoders import jsonable_encoder

from pymongo import MongoClient
import urllib
import numpy as np

import requests
import json
from flatten_json import flatten

from suds.client import Client
from suds.transport.https import HttpAuthenticated
from typing import Union

import re

import httpx

# importing datetime module
import datetime


from passlib.context import CryptContext


# username = 'KAAR'
# password = 'Qpmck@@r098'

# connection string for mongoDB

mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
client = MongoClient(mongodb_uri)

# intializing SAP system credentials

sap_username = 'Girish'
sap_password = 'Kaar@12345'



def ENEC_IT_request_count_api():

    db = client["ENEC_RasaChatbot"]
    collection = db["ITTickets"]
    a=collection.find()

    ticket_count = 0

    for details in a:
            ticket_count += 1
    # print(ticket_count)

    return ticket_count

def ENEC_Pending_PR_req_count_api(username):

    # db = client["ENEC_RasaChatbot"]
    # collection = db["Approved_PR"]
    # a=collection.find()

    # approved_pr_list = []

    # for i in a:
    #     if data.username == i["username"]:
    #         approved_pr_list.append(i['Purchase Requisition Number'])


    # Approved_pr_count = len(approved_pr_list)
    # print(approved_pr_list)
    # print(len(approved_pr_list))


    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_pr_pending?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZfmPrPending(username) 
    listofobj = result[0]
    pendingpr = ['PR '+str(i.Banfn) for i in listofobj]

    Pending_pr_count = len(pendingpr)
    # print(pendingpr)
    # print(len(pendingpr))


    # Total_pending_pr_count = Pending_pr_count + Approved_pr_count
    # print(Total_pending_pr_count)
      


    return Pending_pr_count


def ENEC_Pending_PO_count_api(username):
     
    url = "http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_po_pending?sap-client=100" 

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZfmPoPending(f'{username}') 
    listofobj = result[0]
    pendingpo = ['PO '+str(i.Ebeln) for i in listofobj]

    print(pendingpo)

    pending_po_count = len(pendingpo)
     
    return pending_po_count

def ENEC_Pending_Invoice_count_api(username):
     
    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_pending_web?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZFM_INV_PENDING(username) 
    listofobj = result[0]
    pendinginvoice = ['IN '+str(i.INVOICE) for i in listofobj]

    Pending_Invoice_count = len(pendinginvoice)

    # print(pendinginvoice)
    # print(Pending_Invoice_count)

    return Pending_Invoice_count


def ENEC_Pending_PL_count_api():
     
         # db = client["QPMC_RasaChatbot"]
    # collection = db["Approved_Leave"]
    # a=collection.find()

    # approved_leave_list = []

    # for i in a:
    #     approved_leave_list.append(i['Leave Id'])


    # Approved_leave_count = len(approved_leave_list)
    # print(Approved_leave_count)


    username = 'kaaradmin@qatarprimaT1'
    password = 'Qpmc@456'

     # extranct date from the sentence
    def extract_date_from_sentence(sentence):
        pattern = r"\((.*?)\)"  # Regex pattern to match text within parentheses
        match = re.search(pattern, sentence)  # Search for the pattern in the sentence

        if match:
            date_within_parentheses = match.group(1)  # Extract the text within parentheses
            return date_within_parentheses
        else:
            return None

    # extracting words before paranthesis to find Leave Type
    def words_before_parenthesis(sentence):
        # Find the index of the opening parenthesis
        parenthesis_index = sentence.find("(")

        if parenthesis_index != -1:
            words = sentence[:parenthesis_index][:-1]
            return words
        else:
            return None

    # picking up name from the sentece 
    def pick_name_from_sentence(sentence):
        colon_index = sentence.find(":")
        
        if colon_index != -1:
            words = sentence[colon_index+2:]
            return words
        else:
            return None

    url = 'https://api2preview.sapsf.eu/odata/v2/Todo?$filter=categoryId%20eq%20%2718%27'
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)

    pendingleave=[]
    i=0 
    while True:
        try:
            d={
            'Leave Id':flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectId'],
            'Employee Name':pick_name_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
            'Leave Duration': extract_date_from_sentence(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName']),
            'Leave Type': words_before_parenthesis(flatjs[f'feed_entry_content_m:properties_d:todos_d:element_d:entries_d:element_{i}_d:subjectFullName'])
            }
            pendingleave.append(d)
            i+=1
        except: 
            break
  
    print(pendingleave)
    # print(len(pendingleave))
    Pending_leave_count = len(pendingleave)


    # Total_PL_count = Pending_leave_count + Approved_leave_count

    return Pending_leave_count


def ENEC_Approved_PR_count_api(username):


    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_PR"]
    a=collection.find()

    approved_pr_list = []

    for i in a:
        if username == i["username"]:
            approved_pr_list.append(i['Purchase Requisition Number'])

    print(approved_pr_list)
    
    Approved_pr_count = len(approved_pr_list)

    return Approved_pr_count


def ENEC_Approved_PO_count_api(username):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_PO"]
    a=collection.find()

    approved_po_list = []

    for i in a:
        if username == i["username"]:
            approved_po_list.append(i['Purchase Order Number'])

    print(approved_po_list)

    Approved_PO_count = len(approved_po_list)

    return Approved_PO_count

def ENEC_Approved_INVOICE_count_api(username):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_INVOICE"]
    a=collection.find()

    approved_invoice_list = []

    for i in a:
        if username == i["username"]:
            approved_invoice_list.append(i['Invoice number'])

    # print(approved_invoice_list)

    approved_invoice_count = len(approved_invoice_list)

    return approved_invoice_count


def ENEC_Approved_Leave_count_api():

    db = client["QPMC_RasaChatbot"]
    collection = db["Approved_Leave"]
    a=collection.find()

    approved_leave_list = []

    for i in a:
        approved_leave_list.append(i['Leave Id'])


    Approved_leave_count = len(approved_leave_list)
    print(Approved_leave_count)

    return Approved_leave_count








def ENEC_Rejected_PR_count_api(username):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_PR"]
    a=collection.find()

    rejected_pr_list = []

    for i in a:
        if username == i["username"]:
            rejected_pr_list.append(i['Purchase Requisition Number'])
    
    rejected_pr_count = len(rejected_pr_list)

    return rejected_pr_count


def ENEC_Rejected_PO_count_api(username):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_PO"]
    a=collection.find()

    rejected_po_list = []

    for i in a:
        if username == i["username"]:
            rejected_po_list.append(i['Purchase Order Number'])

    rejected_po_count = len(rejected_po_list)

    
    return rejected_po_count


def ENEC_Rejected_Invoice_count_api(username):

    
    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_INVOICE"]
    a=collection.find()

    rejected_invoice_list = []

    for i in a:
        if username == i["username"]:
            rejected_invoice_list.append(i['Invoice number'])

    print(rejected_invoice_list)

    rejected_invoice_count = len(rejected_invoice_list)


    return rejected_invoice_count


def ENEC_Rejected_Leave_req_api():

    db = client["QPMC_RasaChatbot"]
    collection = db["Rejected_Leave"]
    a=collection.find()

    rejected_leave_list=[]


    for i in a:
        rejected_leave_list.append(i['Leave Id'])

    rejected_leave_req_count = len(rejected_leave_list)
    

    return rejected_leave_req_count



def ENEC_Pending_PR_list(username):
    
    
    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_pr_pending?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZfmPrPending(username) 
    listofobj = result[0]
    pendingpr = ['PR '+str(i.Banfn) for i in listofobj]

    # print(pendingpr)
    # print(pendingpr[-1])

    return pendingpr


def ENEC_Pending_PO_list(username):

    url = "http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_po_pending?sap-client=100" 

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZfmPoPending(username) 
    listofobj = result[0]
    pendingpo = ['PO '+str(i.Ebeln) for i in listofobj]

    # print(pendingpo)
    # print(pendingpo[-1])

    return pendingpo


def ENEC_Pending_invoice_list(username):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_pending_web?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZFM_INV_PENDING(username) 
    listofobj = result[0]
    pendinginvoice = ['IN '+str(i.INVOICE) for i in listofobj]



    return pendinginvoice