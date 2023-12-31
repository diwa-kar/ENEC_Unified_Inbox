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

# import httpx

# importing datetime module
# import datetime

from datetime import datetime

from passlib.context import CryptContext

from Dashboard_api import ENEC_IT_request_count_api, ENEC_Pending_PR_req_count_api, ENEC_Pending_PO_count_api, ENEC_Pending_Invoice_count_api, ENEC_Pending_PL_count_api, ENEC_Approved_PR_count_api, ENEC_Approved_PO_count_api, ENEC_Approved_INVOICE_count_api, ENEC_Approved_Leave_count_api, ENEC_Rejected_PR_count_api, ENEC_Rejected_PO_count_api, ENEC_Rejected_Invoice_count_api,ENEC_Rejected_Leave_req_api,ENEC_Pending_PR_list_recent,ENEC_Pending_PO_list_recent,ENEC_Pending_invoice_list_recent,ENEC_Pending_SES_count_api,ENEC_Approved_SES_count_api,ENEC_Rejected_SES_count_api,ENEC_Pending_ses_list_recent


# username = 'KAAR'
# password = 'Qpmck@@r098'

# connection string for mongoDB

mongodb_uri = 'mongodb+srv://Bharathkumarkaar:1874924vbk@rasachatbot.ibvkwut.mongodb.net/test'
client = MongoClient(mongodb_uri)

# intializing SAP system credentials

sap_username = 'Girish'
sap_password = 'Final@12345'


# Initializing the fast API server

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#defining the model inputs

class User(BaseModel):
    prno : int
    pritemno : int
    WfRequestId:str


class UserRegister(BaseModel):
    username: str
    password: str
    usertype: list = []


class UserLogin(BaseModel):
    username: str
    password: str


class Pending_pr_list(BaseModel):
    username: str

class Pending_pr_item_list(BaseModel):
    prno : str

class pending_pr_item_description(BaseModel):
    prno : str
    pritemno : str

class ENEC_pending_pr_item_info(BaseModel):
    prno : str

class ENEC_approved_pr_list_mongo(BaseModel):
    username : str

class ENEC_rejected_pr_list_mongo(BaseModel):
    username : str

class ENEC_approved_pr_item_info(BaseModel):
    prno : str
    username : str

class ENEC_rejected_pr_item_info(BaseModel):
    prno : str
    username : str

class pending_pr_approval(BaseModel):
    username : str
    prno: str
    comment : str | None

class pending_pr_rejection(BaseModel):
    username : str
    prno: str
    comment : str | None

class pending_po_list(BaseModel):
    username: str

class pending_po_item_list(BaseModel):
    pono: str

class pending_po_item_description(BaseModel):
    pono : str
    poitemno : str

class pending_po_item_info(BaseModel):
    pono: str

class ENEC_approved_po_list_mongo(BaseModel):
    username : str

class ENEC_rejected_po_list_mongo(BaseModel):
    username : str

class approved_po_item_info(BaseModel):
    pono: str
    username: str

class rejected_po_item_info(BaseModel):
    pono: str
    username: str

class pending_po_approval(BaseModel):
    username: str
    pono : str
    comment: str | None

class pending_po_rejection(BaseModel):
    username: str
    pono : str
    comment: str | None

class Pending_invoice_list(BaseModel):
    username: str

class Pending_invoice_item_info(BaseModel):
    inv_no: str


class pending_invoice_approval(BaseModel):
    username : str
    inv_no: str
    comment : str | None


class pending_invoice_rejection(BaseModel):
    username : str
    inv_no: str
    comment : str | None


class ENEC_approved_invoice_list_mongo(BaseModel):
    username : str

class ENEC_rejected_invoice_list_mongo(BaseModel):
    username : str

class ENEC_approved_invoice_item_info(BaseModel):
    inv_no : str
    username : str

class ENEC_rejected_invoice_item_info(BaseModel):
    inv_no : str
    username : str


class ENEC_Pending_SES_List(BaseModel):
    username : str

class ENEC_SES_DETAILS(BaseModel):
    username: str
    ses_no : str

class ENEC_SES_Approval(BaseModel):
    username: str
    ses_no: str
    comment: str

class ENEC_SES_Rejection(BaseModel):
    username: str
    ses_no: str
    comment: str

class ENEC_approved_ses_list_mongo(BaseModel):
    username: str

class ENEC_rejected_ses_list_mongo(BaseModel):
    username: str


class ENEC_approved_ses_info(BaseModel):
    ses_no : str
    username : str

class ENEC_rejected_ses_info(BaseModel):
    ses_no : str
    username : str


# ************************************* Dashbodard Class ******************************************************************

class ENEC_Total_PR_req_count(BaseModel):
    username : str

class ENEC_Total_PO_count(BaseModel):
    username : str

class ENEC_Total_Invoice_count(BaseModel):
    username : str

class ENEC_Total_SES_count(BaseModel):
    username : str

class ENEC_Total_pending_req(BaseModel):
    username: str




class ENEC_Approved_PR_count(BaseModel):
    username: str

class ENEC_Approved_PO_count(BaseModel):
    username: str

class ENEC_Approved_INVOICE_count(BaseModel):
    username: str

class ENEC_Approved_SES_count(BaseModel):
    username: str


class ENEC_Total_Approved_count(BaseModel):
    username: str



class ENEC_Rejected_PR_count(BaseModel):
    username: str

class ENEC_Rejected_PO_count(BaseModel):
    username: str

class ENEC_Rejected_Invoice_count(BaseModel):
    username: str

class ENEC_Total_Rejected_count(BaseModel):
    username: str




class Bar_chart_opened_closed_req(BaseModel):
    username: str



class Donut_chart_opened_closed_req(BaseModel):
    username: str


# ************************************* Dashbodard Class ******************************************************************





#************************************** combined dashboard api ***********************************************************

class Dashboard_combined_api(BaseModel):
    username: str


class ENEC_Recent_requests(BaseModel):
    username: str



#************************************** combined dashboard api ***********************************************************







class IT_ticket_creation(BaseModel):
    tickettype : str
    Hardwaretype : str
    monitorsize : str | None
    username: str

# class It_tickets_details(BaseModel):
    



@app.get('/')
async def index():
    return {'message':'hello, world'}

@app.get('/welcome')
async def welcome():
    return {'message':'Welcome, Mate!'}


@app.post("/register")
def register(user: UserRegister):

    db = client["ENEC_RasaChatbot"]
    collection = db["ENEC_Credentials"]

    # Check if user already exists
    if collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = pwd_context.hash(user.password)
    
    # Hash the password
    # Store user in database
    user_data = {
        "username": user.username,
        "password": hashed_password,
        "usertype": user.usertype

    }
    collection.insert_one(user_data)

    print(user_data)


    return {"message": "User Registered Successfully"}

@app.post("/login")
def login(user: UserLogin):
    print(user)

    db = client["ENEC_RasaChatbot"]
    collection = db["ENEC_Credentials"]

    # Find the user in the database
    db_user = collection.find_one({"username": user.username})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    # Verify the password
    if not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    username = db_user.get("username")

    response = {
        "username": username,
        "password": user.password
    }


    return {"message": "Login successful", "user": response}




@app.post("/pending_pr_list")
def Pending_pr_list(data: Pending_pr_list):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_pr_pen_time_bapi?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZFM_PR_PENDING(data.username)

    listofobj = result[0]
    # print(listofobj)


    pending_pr_list = []


    for i in listofobj:
        pending_pr_dict = {}
        pending_pr_dict['PR_NO'] = "PR " + str(i['BANFN'])
        pending_pr_dict['CH_ON'] = i['CH_ON']
        pending_pr_dict['CREATED_BY'] = i['CREATED_BY']
        pending_pr_dict['CREATED_TIME'] = i['CREATEDTIME']
        # print(pending_ses_dict)
        pending_pr_list.append(pending_pr_dict)


    return pending_pr_list


@app.post("/pending_pr_item_list")
def Pending_pr_itme_list(data: Pending_pr_item_list):

    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader(\'{data.prno}\')/to_PurchaseReqnItem"

    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PR Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseRequisitionItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PR Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseRequisitionItem']}")
                break
    print(itemlist)


    return itemlist




@app.post("/pending_pr_item_description")
def Pending_pr_itme_list(data: pending_pr_item_description):


    url = f'http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/C_PURREQUISITION_FS_SRV/I_Purchaserequisitionitem(PurchaseRequisition=\'{data.prno}\',PurchaseRequisitionItem=\'{data.pritemno}\')'


    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    desc = {}
    desc['Purchase_Requisition_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisition']
    desc['Purchase_Requisition_Item_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItem']
    desc['Purchase_Requisition_Release_Status'] = flatjs['entry_content_m:properties_d:PurReqnReleaseStatus']
    desc['Purchase_Requisition_Item_Text'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItemText']
    desc['Purchase_Requisition_Material_Group'] = flatjs['entry_content_m:properties_d:MaterialGroup']
    desc['Requested_Quantity'] = flatjs['entry_content_m:properties_d:RequestedQuantity']
    desc['Base_Unit'] = flatjs['entry_content_m:properties_d:BaseUnit']
    desc['Purchase_Requisition_Price'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionPrice']
    desc['Plant'] = flatjs['entry_content_m:properties_d:Plant']
    desc['Company_Code'] = flatjs['entry_content_m:properties_d:CompanyCode']
    desc['Processing_Status'] = flatjs['entry_content_m:properties_d:ProcessingStatus']
    desc['Delivery_Date'] = flatjs['entry_content_m:properties_d:DeliveryDate']
    desc['Creation_Date'] = flatjs['entry_content_m:properties_d:CreationDate']
    # item_list_description["PR item "+ i] = desc
    
    print(desc)


    return desc


@app.post('/pending_pr_item_info')
def ENEC_pending_pr_item_info(data : ENEC_pending_pr_item_info):

    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader(\'{data.prno}\')/to_PurchaseReqnItem"

    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PR Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseRequisitionItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PR Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseRequisitionItem']}")
                break
    print(itemlist)

    # list for looping the items no of the pr
    items_list=[]

    for i in itemlist:
        a = i.split()[-1]
        items_list.append(a)

    print(items_list)

 


    # dict for  storing item description
    item_list_description = {}


    # ********************************************** code for retreival of docs from sap system **************************************************

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_pr_dms_base64?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZMM_PR_DMS_BASE64(data.prno) 

    data_list = []

    if len(result) != 0:
        result_2  = result[0]

        # print(result_2)


        for i in result_2:
            data_dict = {}
            data_dict["OBJKY"] = i["OBJKY"]
            data_dict["DOKNR"] = i["DOKNR"]
            data_dict["FILETYPE"] = i["FILETYPE"]
            data_dict["FILENAME"] = i["FILENAME"]
            data_dict["ZBASE64"] = i["ZBASE64"]
            
            data_list.append(data_dict)
    

        item_list_description["docs"] = data_list   

    # ********************************************** code for retreival of docs from sap system **************************************************


    for i in items_list:
        
        url = f'http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/C_PURREQUISITION_FS_SRV/I_Purchaserequisitionitem(PurchaseRequisition=\'{data.prno}\',PurchaseRequisitionItem=\'{i}\')'

        # Create a session and set the authorization header
        session = requests.Session()
        session.auth = (sap_username, sap_password)
        # Send a GET request to the SAP system
        response = session.get(url)
        # Print the response status code and content
        obj = response.content
        objstr = str(obj, 'UTF-8')
        obj2 = xmltodict.parse(objstr)
        js = json.dumps(obj2)
        js_obj = json.loads(js)
        flatjs = flatten(js_obj)
        desc = {}
        desc['Purchase_Requisition_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisition']
        desc['Purchase_Requisition_Item_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItem']
        desc['Purchase_Requisition_Release_Status'] = flatjs['entry_content_m:properties_d:PurReqnReleaseStatus']
        desc['Purchase_Requisition_Item_Text'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItemText']
        desc['Purchase_Requisition_Material_Group'] = flatjs['entry_content_m:properties_d:MaterialGroup']
        desc['Requested_Quantity'] = flatjs['entry_content_m:properties_d:RequestedQuantity']
        desc['Base_Unit'] = flatjs['entry_content_m:properties_d:BaseUnit']
        desc['Purchase_Requisition_Price'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionPrice']
        desc['Plant'] = flatjs['entry_content_m:properties_d:Plant']
        desc['Company_Code'] = flatjs['entry_content_m:properties_d:CompanyCode']
        desc['Processing_Status'] = flatjs['entry_content_m:properties_d:ProcessingStatus']
        desc['Delivery_Date'] = flatjs['entry_content_m:properties_d:DeliveryDate']
        desc['Creation_Date'] = flatjs['entry_content_m:properties_d:CreationDate']

        item_list_description["PR item "+ i] = desc

    print(item_list_description)




    return item_list_description

@app.post('/approved_pr_item_info')
def ENEC_approved_pr_item_info(data : ENEC_approved_pr_item_info):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_PR"]
    a=collection.find()

    pr_comment = ""

    for i in a:
        
        if i['Purchase Requisition Number'].split()[-1] == data.prno and i['username'] == data.username:
            pr_comment = i['Comment']

    print("the pr and comment",data.prno,pr_comment)
    


    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader(\'{data.prno}\')/to_PurchaseReqnItem"

    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PR Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseRequisitionItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PR Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseRequisitionItem']}")
                break
    print(itemlist)

    # list for looping the items no of the pr
    items_list=[]

    for i in itemlist:
        a = i.split()[-1]
        items_list.append(a)

    print(items_list)

    # dict for  storing item description
    item_list_description = {}


    # ********************************************** code for retreival of docs from sap system **************************************************

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_pr_dms_base64?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZMM_PR_DMS_BASE64(data.prno) 

    data_list = []

    if len(result) != 0:
        result_2  = result[0]

        # print(result_2)

        for i in result_2:
            data_dict = {}
            data_dict["OBJKY"] = i["OBJKY"]
            data_dict["DOKNR"] = i["DOKNR"]
            data_dict["FILETYPE"] = i["FILETYPE"]
            data_dict["FILENAME"] = i["FILENAME"]
            data_dict["ZBASE64"] = i["ZBASE64"]
            
            data_list.append(data_dict)
    

        item_list_description["docs"] = data_list   

    # ********************************************** code for retreival of docs from sap system **************************************************


    for i in items_list:
        
        url = f'http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/C_PURREQUISITION_FS_SRV/I_Purchaserequisitionitem(PurchaseRequisition=\'{data.prno}\',PurchaseRequisitionItem=\'{i}\')'

        # Create a session and set the authorization header
        session = requests.Session()
        session.auth = (sap_username, sap_password)
        # Send a GET request to the SAP system
        response = session.get(url)
        # Print the response status code and content
        obj = response.content
        objstr = str(obj, 'UTF-8')
        obj2 = xmltodict.parse(objstr)
        js = json.dumps(obj2)
        js_obj = json.loads(js)
        flatjs = flatten(js_obj)
        desc = {}
        desc['Purchase_Requisition_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisition']
        desc['Purchase_Requisition_Item_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItem']
        desc['Purchase_Requisition_Release_Status'] = flatjs['entry_content_m:properties_d:PurReqnReleaseStatus']
        desc['Purchase_Requisition_Item_Text'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItemText']
        desc['Purchase_Requisition_Material_Group'] = flatjs['entry_content_m:properties_d:MaterialGroup']
        desc['Requested_Quantity'] = flatjs['entry_content_m:properties_d:RequestedQuantity']
        desc['Base_Unit'] = flatjs['entry_content_m:properties_d:BaseUnit']
        desc['Purchase_Requisition_Price'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionPrice']
        desc['Plant'] = flatjs['entry_content_m:properties_d:Plant']
        desc['Company_Code'] = flatjs['entry_content_m:properties_d:CompanyCode']
        desc['Processing_Status'] = flatjs['entry_content_m:properties_d:ProcessingStatus']
        desc['Delivery_Date'] = flatjs['entry_content_m:properties_d:DeliveryDate']
        desc['Creation_Date'] = flatjs['entry_content_m:properties_d:CreationDate']
        desc["Comment"] = pr_comment
        item_list_description["PR item "+ i] = desc

        # item_list_description["Comment"] = pr_comment

    print(item_list_description)


    return item_list_description

@app.post('/rejected_pr_item_info')
def rejected_pr_item_info(data : ENEC_rejected_pr_item_info):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_PR"]
    a=collection.find()

    pr_comment = ""

    for i in a:
        
        if i['Purchase Requisition Number'].split()[-1] == data.prno and i['username'] == data.username:
            pr_comment = i['Comment']

    print("the pr and comment",data.prno,pr_comment)

    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader(\'{data.prno}\')/to_PurchaseReqnItem"

    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PR Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseRequisitionItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PR Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseRequisitionItem']}")
                break
    print(itemlist)

    # list for looping the items no of the pr
    items_list=[]

    for i in itemlist:
        a = i.split()[-1]
        items_list.append(a)

    print(items_list)

    # dict for  storing item description
    item_list_description = {}

    
    # ********************************************** code for retreival of docs from sap system **************************************************

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_pr_dms_base64?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZMM_PR_DMS_BASE64(data.prno) 

    data_list = []

    if len(result) != 0:
        result_2  = result[0]

        # print(result_2)

        for i in result_2:
            data_dict = {}
            data_dict["OBJKY"] = i["OBJKY"]
            data_dict["DOKNR"] = i["DOKNR"]
            data_dict["FILETYPE"] = i["FILETYPE"]
            data_dict["FILENAME"] = i["FILENAME"]
            data_dict["ZBASE64"] = i["ZBASE64"]
            
            data_list.append(data_dict)
    

        item_list_description["docs"] = data_list   

    # ********************************************** code for retreival of docs from sap system **************************************************

    for i in items_list:
        
        url = f'http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/C_PURREQUISITION_FS_SRV/I_Purchaserequisitionitem(PurchaseRequisition=\'{data.prno}\',PurchaseRequisitionItem=\'{i}\')'

        # Create a session and set the authorization header
        session = requests.Session()
        session.auth = (sap_username, sap_password)
        # Send a GET request to the SAP system
        response = session.get(url)
        # Print the response status code and content
        obj = response.content
        objstr = str(obj, 'UTF-8')
        obj2 = xmltodict.parse(objstr)
        js = json.dumps(obj2)
        js_obj = json.loads(js)
        flatjs = flatten(js_obj)
        desc = {}
        desc['Purchase_Requisition_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisition']
        desc['Purchase_Requisition_Item_Number'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItem']
        desc['Purchase_Requisition_Release_Status'] = flatjs['entry_content_m:properties_d:PurReqnReleaseStatus']
        desc['Purchase_Requisition_Item_Text'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionItemText']
        desc['Purchase_Requisition_Material_Group'] = flatjs['entry_content_m:properties_d:MaterialGroup']
        desc['Requested_Quantity'] = flatjs['entry_content_m:properties_d:RequestedQuantity']
        desc['Base_Unit'] = flatjs['entry_content_m:properties_d:BaseUnit']
        desc['Purchase_Requisition_Price'] = flatjs['entry_content_m:properties_d:PurchaseRequisitionPrice']
        desc['Plant'] = flatjs['entry_content_m:properties_d:Plant']
        desc['Company_Code'] = flatjs['entry_content_m:properties_d:CompanyCode']
        desc['Processing_Status'] = flatjs['entry_content_m:properties_d:ProcessingStatus']
        desc['Delivery_Date'] = flatjs['entry_content_m:properties_d:DeliveryDate']
        desc['Creation_Date'] = flatjs['entry_content_m:properties_d:CreationDate']
        desc["Comment"] = pr_comment
        item_list_description["PR item "+ i] = desc

        # item_list_description["Comment"] = pr_comment

    print(item_list_description)


    return item_list_description


@app.post('/pending_pr_approval')
def pending_pr_approval(data : pending_pr_approval):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_pr_acceptreject?sap-client=100'
    transport = HttpAuthenticated(username = sap_username, password = sap_password)
    sap_client = Client(url,transport=transport)

    result = sap_client.service.ZmmPrApprRejFm('A',f'{data.comment}',f'{data.prno}',f'{data.username}')
    
    # adding comment to the result
    result["Comment"] = data.comment

    print(result)

    Status_code = result["ExStatus"]

    if Status_code == "ERROR":

        text =f"PR {data.prno} is already approved/rejected" 


    elif Status_code == "APPROVED":

        current_date = datetime.now().date()
        current_time = datetime.now().time()

        db = client["ENEC_RasaChatbot"]
        collection = db["Approved_PR"]
        document = {"Purchase Requisition Number": "PR "+f"{data.prno}", "Status":"Approved","Comment":f"{data.comment}","username": f"{data.username}", "Approved_date": f"{current_date}","Approved_time": f"{current_time}" }
        res = collection.insert_one(document)

        text =f"PR {data.prno} is Approved successfully" 

    return text

@app.post('/pending_pr_rejection')
def pending_pr_rejection(data : pending_pr_rejection):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_pr_acceptreject?sap-client=100'
    transport = HttpAuthenticated(username = sap_username, password = sap_password)
    sap_client = Client(url,transport=transport)

    result = sap_client.service.ZmmPrApprRejFm('R',f'{data.comment}',f'{data.prno}',f'{data.username}')
    
    # adding comment to the result
    result["Comment"] = data.comment

    print(result)

    Status_code = result["ExStatus"]

    if Status_code == "ERROR":

        text =f"PR {data.prno} is already approved/rejected" 

    elif Status_code == "REJECTED":

        current_date = datetime.now().date()
        current_time = datetime.now().time()

        db = client["ENEC_RasaChatbot"]
        collection = db["Rejected_PR"]
        document = {"Purchase Requisition Number": "PR "+f"{data.prno}", "Status":"Rejected","Comment":f"{data.comment}","username": f"{data.username}", "Date_of_rejection": f"{current_date}", "Time_of_rejection": f"{current_time}"}
        res = collection.insert_one(document)

        text =f"PR {data.prno} is Rejected successfully" 

    return text

@app.post('/pending_po_item_info')
def pending_po_item_info(data:pending_po_item_info):

    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder(\'{data.pono}\')/to_PurchaseOrderItem"


    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PO Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseOrderItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PO Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseOrderItem']}")
                break
    print(itemlist)

    items_list = []


    for i in itemlist:
        a = i.split()[-1]
        items_list.append(a)
        
    print(items_list)

    # dict for  storing item description
    item_list_description = {}

    # *********************************************************** code for po attachment **************************************************************

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_po_dms_base64?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZMM_DMS_BASE64(data.pono) 

    data_list = []

    if len(result) != 0:

        result_2 = result[0]

        print(result_2)


        for i in result_2:
            data_dict = {}
            data_dict["OBJKY"] = i["OBJKY"]
            data_dict["DOKNR"] = i["DOKNR"]
            data_dict["FILETYPE"] = i["FILETYPE"]
            data_dict["FILENAME"] = i["FILENAME"]
            data_dict["ZBASE64"] = i["ZBASE64"]
            
            data_list.append(data_dict)
        
        item_list_description["docs"] = data_list   



    # *********************************************************** code for po attachment **************************************************************


    for i in items_list:
        
        url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrderItem(PurchaseOrder=\'{data.pono}\',PurchaseOrderItem=\'{i}\')/to_PurchaseOrder"


        # Create a session and set the authorization header
        session = requests.Session()
        session.auth = (sap_username, sap_password)
        # Send a GET request to the SAP system
        response = session.get(url)
        # Print the response status code and content
        obj = response.content
        objstr = str(obj, 'UTF-8')
        obj2 = xmltodict.parse(objstr)
        js = json.dumps(obj2)
        js_obj = json.loads(js)
        flatjs = flatten(js_obj)
        
        desc = {}
        desc['Purchase_Order_Number'] = flatjs['entry_content_m:properties_d:PurchaseOrder']
        desc['CompanyCode'] = flatjs['entry_content_m:properties_d:CompanyCode']
        desc['CreatedByUser'] = flatjs['entry_content_m:properties_d:CreatedByUser']
        desc['PurchasingProcessingStatus'] = flatjs['entry_content_m:properties_d:PurchasingProcessingStatus']
        desc['CreationDate'] = flatjs['entry_content_m:properties_d:CreationDate']
        desc['Supplier'] = flatjs['entry_content_m:properties_d:Supplier']
        desc['PurchaseOrderSubtype'] = flatjs['entry_content_m:properties_d:PurchaseOrderSubtype']
        desc['PaymentTerms'] = flatjs['entry_content_m:properties_d:PaymentTerms']
        desc['PurchasingGroup'] = flatjs['entry_content_m:properties_d:PurchasingGroup']
        desc['AddressCityName'] = flatjs['entry_content_m:properties_d:AddressCityName']
        desc['AddressPostalCode'] = flatjs['entry_content_m:properties_d:AddressPostalCode']
        desc['AddressStreetName'] = flatjs['entry_content_m:properties_d:AddressStreetName']
        desc['AddressCountry'] = flatjs['entry_content_m:properties_d:AddressCountry']
        desc['AddressRegion'] = flatjs['entry_content_m:properties_d:AddressRegion']
        item_list_description["PO item "+ i] = desc

        # print(item_list_description)

    return item_list_description


@app.post('/pending_po_list')
def pending_po_list(data: pending_po_list):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_po_pen_time_bapi?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZFM_PO_PENDING(data.username)

    listofobj = result[0]
    # print(listofobj)


    pending_po_list = []


    for i in listofobj:
        pending_po_dict = {}
        pending_po_dict['PO_NO'] = "PO " + str(i['EBELN'])
        pending_po_dict['CREATED_ON'] = i['CREATED_ON']
        pending_po_dict['CREATED_BY'] = i['CREATED_BY']
        pending_po_dict['CREATED_TIME'] = i['CREATEDTIME']
        pending_po_list.append(pending_po_dict)

    return pending_po_list

@app.post('/pending_po_item_list')
def pending_po_item_list(data: pending_po_item_list):

    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder(\'{data.pono}\')/to_PurchaseOrderItem"

    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PO Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseOrderItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PO Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseOrderItem']}")
                break
    print(itemlist)


    return itemlist


@app.post('/pending_po_item_description')
def pending_po_item_description(data : pending_po_item_description):

    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrderItem(PurchaseOrder=\'{data.pono}\',PurchaseOrderItem=\'{data.poitemno}\')/to_PurchaseOrder"

    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    
    desc = {}
    desc['Purchase_Order_Number'] = flatjs['entry_content_m:properties_d:PurchaseOrder']
    desc['CompanyCode'] = flatjs['entry_content_m:properties_d:CompanyCode']
    desc['CreatedByUser'] = flatjs['entry_content_m:properties_d:CreatedByUser']
    desc['PurchasingProcessingStatus'] = flatjs['entry_content_m:properties_d:PurchasingProcessingStatus']
    desc['CreationDate'] = flatjs['entry_content_m:properties_d:CreationDate']
    desc['Supplier'] = flatjs['entry_content_m:properties_d:Supplier']
    desc['PurchaseOrderSubtype'] = flatjs['entry_content_m:properties_d:PurchaseOrderSubtype']
    desc['PaymentTerms'] = flatjs['entry_content_m:properties_d:PaymentTerms']
    desc['PurchasingGroup'] = flatjs['entry_content_m:properties_d:PurchasingGroup']
    desc['AddressCityName'] = flatjs['entry_content_m:properties_d:AddressCityName']
    desc['AddressPostalCode'] = flatjs['entry_content_m:properties_d:AddressPostalCode']
    desc['AddressStreetName'] = flatjs['entry_content_m:properties_d:AddressStreetName']
    desc['AddressCountry'] = flatjs['entry_content_m:properties_d:AddressCountry']
    desc['AddressRegion'] = flatjs['entry_content_m:properties_d:AddressRegion']


    return desc


@app.post('/approved_po_item_info')
def approved_po_item_info(data : approved_po_item_info):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_PO"]
    a=collection.find()
    
    po_comment = ""

    for i in a:
    
        
        if i['Purchase Order Number'].split()[-1] == data.pono and i['username'] == data.username:
            po_comment = i['Comment']
           

    print("the po and comment",data.pono,po_comment)


    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder(\'{data.pono}\')/to_PurchaseOrderItem"


    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PO Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseOrderItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PO Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseOrderItem']}")
                break
    print(itemlist)

    items_list = []


    for i in itemlist:
        a = i.split()[-1]
        items_list.append(a)
        
    print(items_list)

    # dict for  storing item description
    item_list_description = {}

    # *********************************************************** code for po attachment **************************************************************

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_po_dms_base64?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZMM_DMS_BASE64(data.pono) 

    data_list = []

    if len(result) != 0:

        result_2 = result[0]

        print(result_2)


        for i in result_2:
            data_dict = {}
            data_dict["OBJKY"] = i["OBJKY"]
            data_dict["DOKNR"] = i["DOKNR"]
            data_dict["FILETYPE"] = i["FILETYPE"]
            data_dict["FILENAME"] = i["FILENAME"]
            data_dict["ZBASE64"] = i["ZBASE64"]
            
            data_list.append(data_dict)
        
        item_list_description["docs"] = data_list   

    # *********************************************************** code for po attachment **************************************************************


    for i in items_list:
        
        url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrderItem(PurchaseOrder=\'{data.pono}\',PurchaseOrderItem=\'{i}\')/to_PurchaseOrder"


        # Create a session and set the authorization header
        session = requests.Session()
        session.auth = (sap_username, sap_password)
        # Send a GET request to the SAP system
        response = session.get(url)
        # Print the response status code and content
        obj = response.content
        objstr = str(obj, 'UTF-8')
        obj2 = xmltodict.parse(objstr)
        js = json.dumps(obj2)
        js_obj = json.loads(js)
        flatjs = flatten(js_obj)
        
        desc = {}
        desc['Purchase_Order_Number'] = flatjs['entry_content_m:properties_d:PurchaseOrder']
        desc['CompanyCode'] = flatjs['entry_content_m:properties_d:CompanyCode']
        desc['CreatedByUser'] = flatjs['entry_content_m:properties_d:CreatedByUser']
        desc['PurchasingProcessingStatus'] = flatjs['entry_content_m:properties_d:PurchasingProcessingStatus']
        desc['CreationDate'] = flatjs['entry_content_m:properties_d:CreationDate']
        desc['Supplier'] = flatjs['entry_content_m:properties_d:Supplier']
        desc['PurchaseOrderSubtype'] = flatjs['entry_content_m:properties_d:PurchaseOrderSubtype']
        desc['PaymentTerms'] = flatjs['entry_content_m:properties_d:PaymentTerms']
        desc['PurchasingGroup'] = flatjs['entry_content_m:properties_d:PurchasingGroup']
        desc['AddressCityName'] = flatjs['entry_content_m:properties_d:AddressCityName']
        desc['AddressPostalCode'] = flatjs['entry_content_m:properties_d:AddressPostalCode']
        desc['AddressStreetName'] = flatjs['entry_content_m:properties_d:AddressStreetName']
        desc['AddressCountry'] = flatjs['entry_content_m:properties_d:AddressCountry']
        desc['AddressRegion'] = flatjs['entry_content_m:properties_d:AddressRegion']
        desc["Comment"] = po_comment

        item_list_description["PO item "+ i] = desc

        # item_list_description["Comment"] = po_comment

        print(item_list_description)

    return item_list_description

@app.post('/rejected_po_item_info')
def rejected_po_item_info(data : rejected_po_item_info):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_PO"]
    a=collection.find()

    po_comment = ""

    for i in a:
    
        
        if i['Purchase Order Number'].split()[-1] == data.pono and i['username'] == data.username:
            po_comment = i['Comment']
           

    print("the po and comment",data.pono,po_comment)


    url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder(\'{data.pono}\')/to_PurchaseOrderItem"


    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (sap_username, sap_password)
    # Send a GET request to the SAP system
    response = session.get(url)
    # Print the response status code and content
    obj = response.content
    objstr = str(obj, 'UTF-8')
    obj2 = xmltodict.parse(objstr)
    js = json.dumps(obj2)
    js_obj = json.loads(js)
    flatjs = flatten(js_obj)
    itemlist=[]
    i=0
    flag = 0
    while True:
        try:
            itemlist.append(f"PO Item {flatjs[f'feed_entry_{i}_content_m:properties_d:PurchaseOrderItem']}") 
            i+=1
            flag = 1
        except:
            if flag:
                break
            else:
                itemlist.append(f"PO Item {flatjs[f'feed_entry_content_m:properties_d:PurchaseOrderItem']}")
                break
    print(itemlist)

    items_list = []


    for i in itemlist:
        a = i.split()[-1]
        items_list.append(a)
        
    print(items_list)

    # dict for  storing item description
    item_list_description = {}


    # *********************************************************** code for po attachment **************************************************************

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_po_dms_base64?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZMM_DMS_BASE64(data.pono) 

    data_list = []

    if len(result) != 0:

        result_2 = result[0]

        print(result_2)


        for i in result_2:
            data_dict = {}
            data_dict["OBJKY"] = i["OBJKY"]
            data_dict["DOKNR"] = i["DOKNR"]
            data_dict["FILETYPE"] = i["FILETYPE"]
            data_dict["FILENAME"] = i["FILENAME"]
            data_dict["ZBASE64"] = i["ZBASE64"]
            
            data_list.append(data_dict)
        
        item_list_description["docs"] = data_list   

    # *********************************************************** code for po attachment **************************************************************



    for i in items_list:
        
        url = f"http://dxbktlds4.kaarcloud.com:8000/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrderItem(PurchaseOrder=\'{data.pono}\',PurchaseOrderItem=\'{i}\')/to_PurchaseOrder"


        # Create a session and set the authorization header
        session = requests.Session()
        session.auth = (sap_username, sap_password)
        # Send a GET request to the SAP system
        response = session.get(url)
        # Print the response status code and content
        obj = response.content
        objstr = str(obj, 'UTF-8')
        obj2 = xmltodict.parse(objstr)
        js = json.dumps(obj2)
        js_obj = json.loads(js)
        flatjs = flatten(js_obj)
        
        desc = {}
        desc['Purchase_Order_Number'] = flatjs['entry_content_m:properties_d:PurchaseOrder']
        desc['CompanyCode'] = flatjs['entry_content_m:properties_d:CompanyCode']
        desc['CreatedByUser'] = flatjs['entry_content_m:properties_d:CreatedByUser']
        desc['PurchasingProcessingStatus'] = flatjs['entry_content_m:properties_d:PurchasingProcessingStatus']
        desc['CreationDate'] = flatjs['entry_content_m:properties_d:CreationDate']
        desc['Supplier'] = flatjs['entry_content_m:properties_d:Supplier']
        desc['PurchaseOrderSubtype'] = flatjs['entry_content_m:properties_d:PurchaseOrderSubtype']
        desc['PaymentTerms'] = flatjs['entry_content_m:properties_d:PaymentTerms']
        desc['PurchasingGroup'] = flatjs['entry_content_m:properties_d:PurchasingGroup']
        desc['AddressCityName'] = flatjs['entry_content_m:properties_d:AddressCityName']
        desc['AddressPostalCode'] = flatjs['entry_content_m:properties_d:AddressPostalCode']
        desc['AddressStreetName'] = flatjs['entry_content_m:properties_d:AddressStreetName']
        desc['AddressCountry'] = flatjs['entry_content_m:properties_d:AddressCountry']
        desc['AddressRegion'] = flatjs['entry_content_m:properties_d:AddressRegion']
        desc["Comment"] = po_comment

        item_list_description["PO item "+ i] = desc

        # item_list_description["Comment"] = po_comment

        print(item_list_description)

    return item_list_description

    






@app.post('/pending_po_approval')
def pending_po_approval(data : pending_po_approval):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_po_acceptreject?sap-client=100 '
    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)


    result = sap_client.service.ZmmPoApprRejFm('A',f'{data.comment}',f'{data.pono}',f'{data.username}')

    result["Comment"] = data.comment

    print(result)
    print(result["ExStatus"])

    Status_code = result["ExStatus"]

    if Status_code == "ERROR":

        text =f"PO {data.pono} is already approved/rejected" 


    elif Status_code == "APPROVED":


        current_date = datetime.now().date()
        current_time = datetime.now().time()

        db = client["ENEC_RasaChatbot"]
        collection = db["Approved_PO"]
        document = {"Purchase Order Number": "PO "+f"{data.pono}", "Status":"Approved","Comment":f"{data.comment}","username": f"{data.username}" , "Approved_date": f"{current_date}","Approved_time": f"{current_time}"}
        res = collection.insert_one(document)

        text =f"PO {data.pono} is Approved successfully" 

    return text


@app.post('/pending_po_rejection')
def pending_po_rejection(data : pending_po_rejection):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_po_acceptreject?sap-client=100 '
    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)


    result = sap_client.service.ZmmPoApprRejFm('R',f'{data.comment}',f'{data.pono}',f'{data.username}')

    result["Comment"] = data.comment

    print(result)
    print(result["ExStatus"])

    Status_code = result["ExStatus"]

    if Status_code == "ERROR":

        text =f"PO {data.pono} is already approved/rejected" 


    elif Status_code == "REJECTED":

        current_date = datetime.now().date()
        current_time = datetime.now().time()

        db = client["ENEC_RasaChatbot"]
        collection = db["Rejected_PO"]
        document = {"Purchase Order Number": "PO "+f"{data.pono}", "Status":"Rejected","Comment":f"{data.comment}", "username":data.username, "Date_of_rejection": f"{current_date}", "Time_of_rejection": f"{current_time}" }
        res = collection.insert_one(document)

        text =f"PO {data.pono} is Rejected successfully" 

    return text

@app.post('/IT_ticket_creation')
def IT_ticket_creation(data : IT_ticket_creation):

    db = client["ENEC_RasaChatbot"]
    collection = db["ITTickets"]
    random_number = np.random.randint(10000, 100000)
    ticket_number = "TCKT"+str(random_number)
    print(ticket_number)

    current_date = datetime.now().date()
    current_time = datetime.now().time()


    if(data.Hardwaretype == "Monitor"):
        data = {
            "Ticket ID": ticket_number,
            "Ticket type": data.tickettype,
            "Hardware type": data.Hardwaretype,
            "Monitor Size": data.monitorsize,
            "Created_by": data.username,
            "Created_date": current_date,
            "Created_time": current_time
        }
    else:
        data = {
            "Ticket ID": ticket_number,
            "Ticket type": data.tickettype,
            "Hardware type": data.Hardwaretype,
            "Created_by": data.username,
            "Created_date": current_date,
            "Created_time": current_time

        }
    result = collection.insert_one(data)
    if result.inserted_id:
        print("ticket raised succesfully Inserted ID:", result.inserted_id)
        res= f"Ticket Request ({ticket_number}) has been created successfully"
    else:
        res= f"Ticket Request ({ticket_number}) has not been created successfully"

    return res

@app.get('/IT_ticket_list')
async def IT_ticket_list():

    db = client["ENEC_RasaChatbot"]
    collection = db["ITTickets"]
    a=collection.find()

    it_ticket_detail = []


    for i in a:
        ticket={}
        ticket["Ticket id"]=i['Ticket ID']
        ticket["Ticket type"]=i['Ticket type']
        ticket["Hardware type"]=i['Hardware type']
        ticket["Created_date"] = i["date"]
        ticket["Created_by"] = i["Created_by"]


        time_obj = datetime.strptime(i["time"], "%H:%M:%S.%f")
        time_without_decimals = time_obj.strftime("%H:%M:%S")

        ticket["Created_time"] = time_without_decimals


        if(i['Hardware type']=="monitor" or i['Hardware type']=="Monitor" ):
            ticket["Monitor Size"]=i['Monitor Size']
        it_ticket_detail.append(ticket)


    return it_ticket_detail


@app.get('/It_tickets_details')
async def It_tickets_details():

    db = client["ENEC_RasaChatbot"]
    collection = db["ITTickets"]
    a=collection.find()

    it_ticket_detail = []

    for i in a:
        ticket={}
        ticket["Ticket id"]=i['Ticket ID']
        ticket["Ticket type"]=i['Ticket type']
        ticket["Hardware type"]=i['Hardware type']
        ticket["Created_date"] = i["date"]
        ticket["Created_by"] = i["Created_by"]
        
        time_obj = datetime.strptime(i["time"], "%H:%M:%S.%f")
        time_without_decimals = time_obj.strftime("%H:%M:%S")

        ticket["Created_time"] = time_without_decimals



        if(i['Hardware type']=="monitor" or i['Hardware type']=="Monitor" ):
            ticket["Monitor Size"]=i['Monitor Size']
        it_ticket_detail.append(ticket)
        
    return it_ticket_detail


# ********************************************* Approved tab endpoints *************************************************************

@app.post('/ENEC_approved_pr_list_mongo')
async def ENEC_approved_pr_list_mongo(data : ENEC_approved_pr_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_PR"]
    a=collection.find()

    approved_pr_list = []

    for i in a:
        if data.username == i["username"]:
            approved_pr_dict = {}

            approved_pr_dict["PR_NO"] = i['Purchase Requisition Number']
            approved_pr_dict["Approver_name"] = i["username"]
            approved_pr_dict["Approved_time"] = i["Approved_time"]
            approved_pr_dict["Approved_date"] = i["Approved_date"]

            approved_pr_list.append(approved_pr_dict)


    return approved_pr_list


@app.post('/ENEC_approved_po_list_mongo')
async def ENEC_approved_po_list_mongo(data : ENEC_approved_po_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_PO"]
    a=collection.find()

    approved_po_list = []

    for i in a:
        if data.username == i["username"]:
            approved_po_dict = {}

            approved_po_dict["PO_NO"] = i['Purchase Order Number']
            approved_po_dict["Approver_name"] = i["username"]
            approved_po_dict["Approved_time"] = i["Approved_time"]
            approved_po_dict["Approved_date"] = i["Approved_date"]

            approved_po_list.append(approved_po_dict)

    print(approved_po_list)

    return approved_po_list

@app.get('/qpmc_approved_leave_list_mongo')
async def qpmc_approved_leave_list_mongo():

    db = client["QPMC_RasaChatbot"]
    collection = db["Approved_Leave"]
    a=collection.find()

    approved_leave_list = []
    approved_leave_dets= []

    for i in a:
        approved_leave_list.append(i['Leave Id'])
        detail={}
        detail["Leave_id"]=i['Leave Id']
        detail["Employee Name"]=i['Employee Name']
        detail["Leave Duration"]=i['Leave Duration']
        detail["Leave_Type"]=i['Leave Type']
        approved_leave_dets.append(detail)
        
    return {"approved_leave_list":approved_leave_list,"approved_leave_dets":approved_leave_dets}


# ********************************************* Approved tab endpoints *************************************************************

# ********************************************* rejected tab endpoints ********************************************************************


@app.post('/ENEC_rejected_pr_list_mongo')
async def ENEC_rejected_pr_list_mongo(data : ENEC_rejected_pr_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_PR"]
    a=collection.find()

    rejected_pr_list = []

    for i in a:
        if data.username == i["username"]:
            rejected_pr_dict = {}

            rejected_pr_dict["PR_NO"] = i['Purchase Requisition Number']
            rejected_pr_dict["Approver_name"] = i["username"]
            rejected_pr_dict["Rejected_time"] = i["Time_of_rejection"]
            rejected_pr_dict["Rejected_date"] = i["Date_of_rejection"]

            rejected_pr_list.append(rejected_pr_dict)

    return rejected_pr_list

@app.post('/ENEC_rejected_po_list_mongo')
async def ENEC_rejected_po_list_mongo(data : ENEC_rejected_po_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_PO"]
    a=collection.find()

    rejected_po_list = []

    for i in a:
        if data.username == i["username"]:
            rejected_po_dict = {}

            rejected_po_dict["PO_NO"] = i['Purchase Order Number']
            rejected_po_dict["Approver_name"] = i["username"]
            rejected_po_dict["Rejected_time"] = i["Time_of_rejection"]
            rejected_po_dict["Rejected_date"] = i["Date_of_rejection"]

            rejected_po_list.append(rejected_po_dict)

    return rejected_po_list


@app.get('/qpmc_rejected_leave_list_mongo')
async def qpmc_rejected_leave_list_mongo():

    db = client["QPMC_RasaChatbot"]
    collection = db["Rejected_Leave"]
    a=collection.find()

    rejected_leave_list=[]
    rejected_leave_dets= []

    for i in a:
        rejected_leave_list.append(i['Leave Id'])
        detail={}
        detail["Leave_id"]=i['Leave Id']
        detail["Employee Name"]=i['Employee Name']
        detail["Leave Duration"]=i['Leave Duration']
        detail["Leave_Type"]=i['Leave Type']
        rejected_leave_dets.append(detail)
    return {"rejected_leave_list":rejected_leave_list,"rejected_leave_dets":rejected_leave_dets}


# ********************************************* rejected tab endpoints ********************************************************************






































@app.get('/qpmc_leave_reuqest_sf')
async def qpmc_leave_reuqest_sf():

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


    return pendingleave


@app.get('/qpmc_accept_leave_reuqest_sf')
async def qpmc_accept_leave_reuqest_sf(WfRequestId:str,name:str,type:str,duration:str):

    # print(WfRequestId,name,type,duration)
     # Set the SAP URL and credentials
    url = f'https://api2preview.sapsf.eu/odata/v2/approveWfRequest?wfRequestId={WfRequestId}&comment=Approved'
    username = 'kaaradmin@qatarprimaT1'
    password = 'Qpmc@456'
    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.post(url)
    # Print the response status code and content
    print(response.status_code)
    if response.status_code == 200:
        db = client["QPMC_RasaChatbot"]
        collection = db["Approved_Leave"]
        document = {"Leave Id":f"{WfRequestId}","Employee Name":f"{name}","Leave Duration":f"{duration}","Leave Type":f"{type}", "Status":"Approved"}
        res = collection.insert_one(document)

    if response.status_code == 200:
        res = f"Leave Request ({WfRequestId}) has been approved"
    else:
        res = f"Leave Request ({WfRequestId}) has been already approved and moved to higher level approver"

    return res

@app.get('/qmpc_reject_leave_request_sf')
async def qpmc_reject_leave_request_sf(WfRequestId:str,name:str,type:str,duration:str):
    print(WfRequestId,name,type,duration)
    # Set the SAP URL and credentials
    url = f'https://api2preview.sapsf.eu/odata/v2/rejectWfRequest?wfRequestId={WfRequestId}&comment=Rejected'
    username = 'kaaradmin@qatarprimaT1'
    password = 'Qpmc@456'
    # Create a session and set the authorization header
    session = requests.Session()
    session.auth = (username, password)
    # Send a GET request to the SAP system
    response = session.post(url)
    # Print the response status code and content
    print(response)
    if response.status_code == 200:
        db = client["QPMC_RasaChatbot"]
        collection = db["Rejected_Leave"]
        document = {"Leave Id":f"{WfRequestId}" ,"Employee Name":f"{name}","Leave Duration":f"{duration}","Leave Type":f"{type}", "Status":"Rejected"}
        res = collection.insert_one(document)

    if response.status_code == 200:
        res = f"Leave Request ({WfRequestId}) has been rejected"
    else:
        res = f"Leave Request ({WfRequestId}) has been already rejected"


    return res



@app.post("/Pending_invoice_list")
def Pending_invoice_list(data:Pending_invoice_list):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_inv_pen_time_bapi?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZFM_INV_PENDING(data.username)

    listofobj = result[0]
    # print(listofobj)


    pending_inv_list = []


    for i in listofobj:
        pending_inv_dict = {}
        pending_inv_dict['INVOICE_NO'] = "IN " + str(i['INVOICE'])
        pending_inv_dict['CREATED_DATE'] = i['CREATEDDATE']
        pending_inv_dict['CREATED_BY'] = i['CREATED_BY']
        pending_inv_dict['CREATED_TIME'] = i['CREATEDTIME']
        pending_inv_list.append(pending_inv_dict)

    return pending_inv_list



@app.post("/Pending_invoice_item_info")
def Pending_invoice_item_info(data:Pending_invoice_item_info):
    

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_detail_web?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZBAPI_MM_INV_GET_DETAIL(data.inv_no) 
    data = result[2]

    invoice_info = {}

    invoice_info["Invocie_no"] = data["INV_DOC_NO"]
    invoice_info["Fiscal_Year"] = data["FISC_YEAR"]
    invoice_info["Document_Type"] = data["DOC_TYPE"]
    invoice_info["Document_Date"] = data["DOC_DATE"]
    invoice_info["Posting_Date"] = data["PSTNG_DATE"]
    invoice_info["user_name"] = data["USERNAME"]
    invoice_info["Reference_Document_No"] = data["REF_DOC_NO"]
    invoice_info["Company_Code"] = data["COMP_CODE"]
    invoice_info["Currency"] = data["CURRENCY"]
    invoice_info["Gross_amount"] = data["GROSS_AMNT"]


    return invoice_info



@app.post('/pending_invoice_approval')
def pending_invoice_approval(data:pending_invoice_approval):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_apprej_web?sap-client=100'
    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)


    result = sap_client.service.ZFM_INV_APPROVAL('A',f'{data.comment}',f'{data.inv_no}',f'{data.username}')

    result["Comment"] = data.comment

    print(result)


    Status_code = result["EX_STATUS"]

    if Status_code == "FAILURE":

        text =f"IN {data.inv_no} is already approved/rejected" 


    elif Status_code == "SUCCESS":

        current_date = datetime.now().date()
        current_time = datetime.now().time()

        db = client["ENEC_RasaChatbot"]
        collection = db["Approved_INVOICE"]
        document = {"Invoice number": "IN "+f"{data.inv_no}", "Status":"Approved","Comment":f"{data.comment}","username": f"{data.username}","Approved_date": f"{current_date}","Approved_time": f"{current_time}"}
        
        res = collection.insert_one(document)

        text =f"IN {data.inv_no} is Approved successfully" 

    return text

@app.post('/pending_invoice_rejection')
def pending_invoice_rejection(data : pending_invoice_rejection):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_apprej_web?sap-client=100'
    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)


    result = sap_client.service.ZFM_INV_APPROVAL('R',f'{data.comment}',f'{data.inv_no}',f'{data.username}')

    result["Comment"] = data.comment

    print(result)


    Status_code = result["EX_STATUS"]

    if Status_code == "FAILURE":

        text =f"IN {data.inv_no} is already approved/rejected" 


    elif Status_code == "SUCCESS":

        current_date = datetime.now().date()
        current_time = datetime.now().time()

        db = client["ENEC_RasaChatbot"]
        collection = db["Rejected_INVOICE"]
        document = {"Invoice number": "IN "+f"{data.inv_no}", "Status":"Rejected","Comment":f"{data.comment}","username": f"{data.username}","Date_of_rejection": f"{current_date}", "Time_of_rejection": f"{current_time}"}
        
        res = collection.insert_one(document)

        text =f"IN {data.inv_no} is Rejected successfully" 


    return text


    
@app.post('/ENEC_approved_invoice_list_mongo')
async def ENEC_approved_invoice_list_mongo(data : ENEC_approved_invoice_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_INVOICE"]
    a=collection.find()

    approved_invoice_list = []

    for i in a:
        if data.username == i["username"]:
            approved_invoice_list.append(i['Invoice number'])

    print(approved_invoice_list)

    return approved_invoice_list

@app.post('/ENEC_rejected_invoice_list_mongo')
async def ENEC_rejected_invoice_list_mongo(data : ENEC_rejected_invoice_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_INVOICE"]
    a=collection.find()

    rejected_invoice_list = []

    for i in a:
        if data.username == i["username"]:
            rejected_invoice_list.append(i['Invoice number'])

    print(rejected_invoice_list)

    return rejected_invoice_list

@app.post('/ENEC_approved_invoice_item_info')
def ENEC_approved_invoice_item_info(data:ENEC_approved_invoice_item_info):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_INVOICE"]
    a=collection.find()


    invoice_comment = ""

    for i in a:
        if i['Invoice number'].split()[-1] == data.inv_no and i['username'] == data.username:
            invoice_comment = i['Comment']
           

    print("the invno and comment",data.inv_no,invoice_comment)

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_detail_web?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZBAPI_MM_INV_GET_DETAIL(data.inv_no) 
    data = result[2]


    invoice_info = {}

    invoice_info["Invocie_no"] = data["INV_DOC_NO"]
    invoice_info["Fiscal_Year"] = data["FISC_YEAR"]
    invoice_info["Document_Type"] = data["DOC_TYPE"]
    invoice_info["Document_Date"] = data["DOC_DATE"]
    invoice_info["Posting_Date"] = data["PSTNG_DATE"]
    invoice_info["user_name"] = data["USERNAME"]
    invoice_info["Reference_Document_No"] = data["REF_DOC_NO"]
    invoice_info["Company_Code"] = data["COMP_CODE"]
    invoice_info["Currency"] = data["CURRENCY"]
    invoice_info["Gross_amount"] = data["GROSS_AMNT"]


    # adding invoice to the dict
    invoice_info["Comment"] = invoice_comment


    return invoice_info


@app.post('/ENEC_rejected_invoice_item_info')
def ENEC_rejected_invoice_item_info(data:ENEC_rejected_invoice_item_info):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_INVOICE"]
    a=collection.find()


    invoice_comment = ""

    for i in a:
        if i['Invoice number'].split()[-1] == data.inv_no and i['username'] == data.username:
            invoice_comment = i['Comment']
           

    print("the invno and comment",data.inv_no,invoice_comment)

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/sap/bc/srt/scs/sap/zbapi_inv_detail_web?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZBAPI_MM_INV_GET_DETAIL(data.inv_no) 
    data = result[2]


    invoice_info = {}

    invoice_info["Invocie_no"] = data["INV_DOC_NO"]
    invoice_info["Fiscal_Year"] = data["FISC_YEAR"]
    invoice_info["Document_Type"] = data["DOC_TYPE"]
    invoice_info["Document_Date"] = data["DOC_DATE"]
    invoice_info["Posting_Date"] = data["PSTNG_DATE"]
    invoice_info["user_name"] = data["USERNAME"]
    invoice_info["Reference_Document_No"] = data["REF_DOC_NO"]
    invoice_info["Company_Code"] = data["COMP_CODE"]
    invoice_info["Currency"] = data["CURRENCY"]
    invoice_info["Gross_amount"] = data["GROSS_AMNT"]


    # adding invoice to the dict
    invoice_info["Comment"] = invoice_comment


    return invoice_info


@app.post('/ENEC_Pending_SES_List')
def ENEC_Pending_SES_List(data:ENEC_Pending_SES_List):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_ses_pen_time_bapi?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZMM_SES_PENDING_FM(data.username)

    listofobj = result[0]


    pending_ses_list = []


    for i in listofobj:
        pending_ses_dict = {}
        pending_ses_dict['ENTRYSHEET_NO'] = "SES " + str(i['ENTRYSHEET'])
        pending_ses_dict['CREATED_ON'] = i['CREATED_ON']
        pending_ses_dict['CREATED_BY'] = i['CREATED_BY']
        pending_ses_dict['CREATED_TIME'] = i['CREATEDTIME']

        # print(pending_ses_dict)
        pending_ses_list.append(pending_ses_dict)

    # if len(pending_ses_list) >= 21:
    
    #     pending_ses_list = pending_ses_list[:20]



    return pending_ses_list

@app.post('/ENEC_SES_DETAILS')
async def ENEC_SES_DETAILS(data:ENEC_SES_DETAILS):

    # ***************************************** code for docs retreival ************************************************************


    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_ses_gos_att_bapi?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    docs_result = client.service.ZMM_SES_GOS_ATT(data.ses_no) 

    data_list = []

    SES_DETAILS = {}


    if len(docs_result) != 0:

        result_2 = docs_result[0]

        for i in result_2:
            data_dict = {}
            data_dict["DOC_TYPE"] = i["DOC_TY"]
            data_dict["DOC_NAME"] = i["DOC_NAME"]
            data_dict["BASE64"] = i["BASE64"]
            data_list.append(data_dict)

        SES_DETAILS["docs"] = data_list

    # ***************************************** code for docs retreival ************************************************************

    

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_ses_get_detail_time?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZMM_SES_GET_DETAIL_FM(data.ses_no) 

    data = result[0]



    SES_DETAILS["SHEET_NO"] =  data["SHEET_NO"]
    SES_DETAILS["CREATED_BY"] = data["CREATED_BY"]
    SES_DETAILS["CREATED_ON"] = data["CREATED_ON"]
    SES_DETAILS["CURRENCY"] = data["CURRENCY"]
    SES_DETAILS["PO_NUMBER"] = data["PO_NUMBER"]
    SES_DETAILS["PO_ITEM"] = data["PO_ITEM"]
    SES_DETAILS["SHORT_TEXT"] = data["SHORT_TEXT"]
    SES_DETAILS["PCKG_NO"] = data["PCKG_NO"]
    SES_DETAILS["NET_VALUE"] = data["NET_VALUE"]



    return SES_DETAILS



@app.post('/ENEC_SES_Approval')
async def ENEC_SES_Approval(data:ENEC_SES_Approval):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_ses_apporreject_bapi?sap-client=100'
    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)


    result = sap_client.service.ZMM_SES_APPROVE_FM('A',f'{data.comment}',f'{data.ses_no}',data.username)

    # result["Comment"] = comment

    # print(result)

    # print(result["EX_STATUS"])

    Status_code = result["EX_STATUS"]

    if Status_code == "ERROR":

        text =f"SES {data.ses_no} is already approved/rejected" 


    elif Status_code == "Success":

        current_date = datetime.now().date()
        current_time = datetime.now().time()


        db = client["ENEC_RasaChatbot"]
        collection = db["Approved_SES"]
        document = {"SES number": "SES "+f"{data.ses_no}", "Status":"Approved","Comment":f"{data.comment}","username": f"{data.username}", "Date_of_approval": f"{current_date}", "Time_of_approval": f"{current_time}" }
        
        
        res = collection.insert_one(document)

        text =f"SES {data.ses_no} is Approved successfully" 


    return text


@app.post('/ENEC_SES_Rejection')
async def ENEC_SES_Rejection(data:ENEC_SES_Rejection):

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_ses_apporreject_bapi?sap-client=100'
    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)


    result = sap_client.service.ZMM_SES_APPROVE_FM('R',f'{data.comment}',f'{data.ses_no}',data.username)

    # result["Comment"] = comment

    # print(result)

    # print(result["EX_STATUS"])

    Status_code = result["EX_STATUS"]

    if Status_code == "ERROR":

        text =f"SES {data.ses_no} is already approved/rejected" 


    elif Status_code == "Success":

        current_date = datetime.now().date()
        current_time = datetime.now().time()


        db = client["ENEC_RasaChatbot"]
        collection = db["Rejected_SES"]
        document = {"SES number": "SES "+f"{data.ses_no}", "Status":"Rejected","Comment":f"{data.comment}","username": f"{data.username}", "Date_of_rejection": f"{current_date}", "Time_of_rejection": f"{current_time}" }
        
        
        res = collection.insert_one(document)

        text =f"SES {data.ses_no} is Rejected successfully"    


    return text


@app.post('/ENEC_approved_ses_list_mongo')
def ENEC_approved_ses_list_mongo(data:ENEC_approved_ses_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_SES"]
    a=collection.find()

    approved_ses_list = []

    for i in a:
        user_data = {}
        if data.username == i["username"]:

            user_data["SES_No"] = i['SES number']
            user_data["Date_of_approval"] = i['Date_of_approval']
            user_data["Time_of_approval"] = i['Time_of_approval']
            user_data["Approved_by"] = i['username']

            # approved_ses_list.append(i['SES number'])

            approved_ses_list.append(user_data)

    print(approved_ses_list)


    return approved_ses_list

@app.post('/ENEC_rejected_ses_list_mongo')
def ENEC_rejected_ses_list_mongo(data:ENEC_rejected_ses_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_SES"]
    a=collection.find()

    rejected_ses_list = []

    for i in a:
        user_data = {}
        if data.username == i["username"]:

            user_data["SES_No"] = i['SES number']
            user_data["Date_of_rejection"] = i['Date_of_rejection']
            user_data["Time_of_rejection"] = i['Time_of_rejection']
            user_data["Rejected_by"] = i['username']

            rejected_ses_list.append(user_data)

    print(rejected_ses_list)


    return rejected_ses_list


@app.post('/ENEC_approved_ses_info')
async def ENEC_approved_ses_info(data:ENEC_approved_ses_info):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_SES"]
    a=collection.find()


    ses_comment = ""

    for i in a:
        if i['SES number'].split()[-1] == data.ses_no and i['username'] == data.username:
            ses_comment = i['Comment']
           

    print("the sesno and comment",data.ses_no,ses_comment)

    # ***************************************** code for docs retreival ************************************************************


    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_ses_gos_att_bapi?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    docs_result = sap_client.service.ZMM_SES_GOS_ATT(data.ses_no) 

    data_list = []

    SES_DETAILS = {}


    if len(docs_result) != 0:

        result_2 = docs_result[0]

        for i in result_2:
            data_dict = {}
            data_dict["DOC_TYPE"] = i["DOC_TY"]
            data_dict["DOC_NAME"] = i["DOC_NAME"]
            data_dict["BASE64"] = i["BASE64"]
            data_list.append(data_dict)

        SES_DETAILS["docs"] = data_list

    # ***************************************** code for docs retreival ************************************************************


    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_ses_get_detail_time?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZMM_SES_GET_DETAIL_FM(data.ses_no) 
    # print(result)
    # print(result[0])

    data = result[0]

    # SES_DETAILS = {}

    SES_DETAILS["SHEET_NO"] =  data["SHEET_NO"]
    SES_DETAILS["CREATED_BY"] = data["CREATED_BY"]
    SES_DETAILS["CREATED_ON"] = data["CREATED_ON"]
    SES_DETAILS["CURRENCY"] = data["CURRENCY"]
    SES_DETAILS["PO_NUMBER"] = data["PO_NUMBER"]
    SES_DETAILS["PO_ITEM"] = data["PO_ITEM"]
    SES_DETAILS["SHORT_TEXT"] = data["SHORT_TEXT"]
    SES_DETAILS["PCKG_NO"] = data["PCKG_NO"]
    SES_DETAILS["NET_VALUE"] = data["NET_VALUE"]


    # adding invoice to the dict
    SES_DETAILS["Comment"] = ses_comment


    return SES_DETAILS


@app.post('/ENEC_rejected_ses_info')
async def ENEC_rejected_ses_info(data:ENEC_rejected_ses_info):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_SES"]
    a=collection.find()


    ses_comment = ""

    for i in a:
        if i['SES number'].split()[-1] == data.ses_no and i['username'] == data.username:
            ses_comment = i['Comment']
           

    print("the sesno and comment",data.ses_no,ses_comment)


    # ***************************************** code for docs retreival ************************************************************

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zmm_ses_gos_att_bapi?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    docs_result = sap_client.service.ZMM_SES_GOS_ATT(data.ses_no) 

    data_list = []

    SES_DETAILS = {}


    if len(docs_result) != 0:

        result_2 = docs_result[0]

        for i in result_2:
            data_dict = {}
            data_dict["DOC_TYPE"] = i["DOC_TY"]
            data_dict["DOC_NAME"] = i["DOC_NAME"]
            data_dict["BASE64"] = i["BASE64"]
            data_list.append(data_dict)

        SES_DETAILS["docs"] = data_list

    # ***************************************** code for docs retreival ************************************************************



    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/sap/bc/srt/scs/sap/zbapi_ses_get_detail_time?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    sap_client = Client(url,transport=transport)
    result = sap_client.service.ZMM_SES_GET_DETAIL_FM(data.ses_no) 
    # print(result)
    # print(result[0])

    data = result[0]

    # SES_DETAILS = {}

    SES_DETAILS["SHEET_NO"] =  data["SHEET_NO"]
    SES_DETAILS["CREATED_BY"] = data["CREATED_BY"]
    SES_DETAILS["CREATED_ON"] = data["CREATED_ON"]
    SES_DETAILS["CURRENCY"] = data["CURRENCY"]
    SES_DETAILS["PO_NUMBER"] = data["PO_NUMBER"]
    SES_DETAILS["PO_ITEM"] = data["PO_ITEM"]
    SES_DETAILS["SHORT_TEXT"] = data["SHORT_TEXT"]
    SES_DETAILS["PCKG_NO"] = data["PCKG_NO"]
    SES_DETAILS["NET_VALUE"] = data["NET_VALUE"]


    # adding invoice to the dict
    SES_DETAILS["Comment"] = ses_comment



    return SES_DETAILS


# ********************************************************** Dashboard API **********************************************************


@app.get('/ENEC_IT_request_count')
async def ENEC_IT_request_count():

    ticket_count = ENEC_IT_request_count_api()


    return ticket_count


@app.post('/ENEC_Total_PR_req_count')
async def ENEC_Total_PR_req_count(data:ENEC_Total_PR_req_count):

    Pending_pr_count  = ENEC_Pending_PR_req_count_api(data.username)

    return Pending_pr_count


@app.post('/ENEC_Total_PO_count')
async def ENEC_Total_PO_count(data:ENEC_Total_PO_count):

    pending_po_count = ENEC_Pending_PO_count_api(data.username)

    return pending_po_count

@app.post('/ENEC_Total_Invoice_count')
async def ENEC_Total_Invoice_count(data:ENEC_Total_Invoice_count):

    Pending_Invoice_count = ENEC_Pending_Invoice_count_api(data.username)

    return Pending_Invoice_count

@app.post('/ENEC_Total_SES_count')
async def ENEC_Total_SES_count(data:ENEC_Total_SES_count):

    Pending_SES_count = ENEC_Pending_SES_count_api(data.username)

    return Pending_SES_count



@app.get('/ENEC_Total_PL_count')
async def ENEC_Total_PL_count():

    Pending_leave_count = ENEC_Pending_PL_count_api()

    return Pending_leave_count


@app.post('/ENEC_Total_pending_req')
async def ENEC_Total_pending_req(data:ENEC_Total_pending_req):

    Total_pending_req = ENEC_IT_request_count_api() + ENEC_Pending_PL_count_api() + ENEC_Pending_PR_req_count_api(data.username) + ENEC_Pending_PO_count_api(data.username) + ENEC_Pending_Invoice_count_api(data.username) + ENEC_Pending_SES_count_api(data.username)

    return Total_pending_req



@app.post('/ENEC_Approved_PR_count')
async def ENEC_Approved_PR_count(data:ENEC_Approved_PR_count):

    Approved_pr_count = ENEC_Approved_PR_count_api(data.username)

    return Approved_pr_count


@app.post('/ENEC_Approved_PO_count')
async def ENEC_Approved_PR_count(data:ENEC_Approved_PO_count):

    Approved_po_count = ENEC_Approved_PO_count_api(data.username)

    return Approved_po_count

@app.post('/ENEC_Approved_INVOICE_count')
async def ENEC_Approved_INVOICE_count(data:ENEC_Approved_INVOICE_count):

    Approved_invoice_count = ENEC_Approved_INVOICE_count_api(data.username)

    return Approved_invoice_count


@app.post('/ENEC_Approved_SES_count')
async def ENEC_Approved_SES_count(data:ENEC_Approved_SES_count):

    Approved_ses_count = ENEC_Approved_SES_count_api(data.username)


    return Approved_ses_count


@app.post('/ENEC_Approved_Leave_count')
async def ENEC_Approved_Leave_count():

    Approved_leave_count = ENEC_Approved_Leave_count_api()

    return Approved_leave_count




@app.post('/ENEC_Total_Approved_count')
async def ENEC_Total_Approved_count(data:ENEC_Total_Approved_count):

    ENEC_Total_approved_count = ENEC_Approved_PR_count_api(data.username) + ENEC_Approved_PO_count_api(data.username) + ENEC_Approved_INVOICE_count_api(data.username) + ENEC_Approved_Leave_count_api() + ENEC_Approved_SES_count_api(data.username)

    return ENEC_Total_approved_count




@app.post('/ENEC_Rejected_PR_count')
async def ENEC_Rejected_PR_count(data:ENEC_Rejected_PR_count):

    rejected_pr_count = ENEC_Rejected_PR_count_api(data.username)

    return rejected_pr_count



@app.post('/ENEC_Rejected_PO_count')
async def ENEC_Rejected_PO_count(data:ENEC_Rejected_PO_count):

    rejected_po_count = ENEC_Rejected_PO_count_api(data.username)

    return rejected_po_count

@app.post('/ENEC_Rejected_Invoice_count')
async def ENEC_Rejected_Invoice_count(data:ENEC_Rejected_Invoice_count):

    rejected_invoice_count = ENEC_Rejected_Invoice_count_api(data.username)

    return rejected_invoice_count


@app.post('/ENEC_Rejected_Leave_req')
async def ENEC_Rejected_Leave_req():

    ENEC_Rejected_Leave_req_count = ENEC_Rejected_Leave_req_api()

    return ENEC_Rejected_Leave_req_count


@app.post('/ENEC_Total_Rejected_count')
async def ENEC_Total_Rejected_count(data:ENEC_Total_Rejected_count):

    Total_Rejected_count = ENEC_Rejected_PR_count_api(data.username) + ENEC_Rejected_PO_count_api(data.username) + ENEC_Rejected_Invoice_count_api(data.username) + ENEC_Rejected_Leave_req_api()

    return Total_Rejected_count













@app.post('/Bar_chart_opened_closed_req')
async def Bar_chart_opened_closed_req(data:Bar_chart_opened_closed_req):

    Opened_requests = []
    Closed_requests = []

    # PR opened and closed

    Opened_requests_pr = ENEC_Pending_PR_req_count_api(data.username)
    Opened_requests.append(Opened_requests_pr)

    Closed_requests_pr = ENEC_Approved_PR_count_api(data.username) + ENEC_Rejected_PR_count_api(data.username)
    Closed_requests.append(Closed_requests_pr)


    # PO opened and closed

    Opened_requests_po = ENEC_Pending_PO_count_api(data.username)
    Opened_requests.append(Opened_requests_po)

    Closed_requests_po = ENEC_Approved_PO_count_api(data.username) + ENEC_Rejected_PO_count_api(data.username)
    Closed_requests.append(Closed_requests_po)

    
    # Invoice opened and closed

    Opened_requests_invoice = ENEC_Pending_Invoice_count_api(data.username)
    Opened_requests.append(Opened_requests_invoice)

    Closed_requests_invoice = ENEC_Approved_INVOICE_count_api(data) + ENEC_Rejected_Invoice_count_api(data.username)
    Closed_requests.append(Closed_requests_invoice)


    # leave req Opened and closed

    Opened_requests_leave = ENEC_Pending_PL_count_api()
    Opened_requests.append(Opened_requests_leave)

    Closed_requests_leave = ENEC_Approved_Leave_count_api() + ENEC_Rejected_Leave_req_api()
    Closed_requests.append(Closed_requests_leave)


    Bar_chart_data = {
        "Opened_requests":Opened_requests,
        "Closed_requests":Closed_requests
    }


    return Bar_chart_data







@app.post('/Donut_chart_req')
def Donut_chart_opened_closed_req(data:Donut_chart_opened_closed_req):

    # pending pr count
    Donut_pending_pr_count = ENEC_Pending_PR_req_count_api(data.username)

    # pending po count 
    Donut_pending_po_count = ENEC_Pending_PO_count_api(data.username)

    # pending Invoice count
    Donut_pending_invoice_count = ENEC_Pending_Invoice_count_api(data.username)

    # pending Leave count
    Donut_pending_leave_count = ENEC_Pending_PL_count_api()
    

    Donut_data = {
        "Donut_pending_pr_count":Donut_pending_pr_count,
        "Donut_pending_po_count":Donut_pending_po_count,
        "Donut_pending_invoice_count":Donut_pending_invoice_count,
        "Donut_pending_leave_count":Donut_pending_leave_count
    }


    return Donut_data



# ********************************************************** Dashboard API **********************************************************




#*********************************************************** Dashboard Combined API **********************************************************


@app.post('/Dashboard_combined_api')
def Dashboard_combined_api(data:Dashboard_combined_api):

    # Total ticket count
    ticket_count = ENEC_IT_request_count_api()

    # Total Pending pr count
    Pending_pr_count  = ENEC_Pending_PR_req_count_api(data.username)

    # Total Pending po count 
    pending_po_count = ENEC_Pending_PO_count_api(data.username)

    # Total Pending invoice count 
    Pending_Invoice_count = ENEC_Pending_Invoice_count_api(data.username)

    # Total Pending SES count
    Pending_ses_count = ENEC_Pending_SES_count_api(data.username)

    # Total Pending Leave req count
    Pending_leave_count = ENEC_Pending_PL_count_api()

    # Combined all req count 
    Total_pending_req = ticket_count + Pending_leave_count + Pending_pr_count + pending_po_count + Pending_Invoice_count + Pending_ses_count

    
    # Approved requests

    Approved_pr_count = ENEC_Approved_PR_count_api(data.username)
    Approved_po_count = ENEC_Approved_PO_count_api(data.username)
    Approved_invoice_count = ENEC_Approved_INVOICE_count_api(data.username)
    Approved_ses_count = ENEC_Approved_SES_count_api(data.username)
    Approved_leave_count = ENEC_Approved_Leave_count_api()



    # Rejected requests

    Rejected_pr_count = ENEC_Rejected_PR_count_api(data.username)
    Rejected_po_count = ENEC_Rejected_PO_count_api(data.username)
    Rejected_invoice_count = ENEC_Rejected_Invoice_count_api(data.username)
    Rejected_ses_count = ENEC_Rejected_SES_count_api(data.username)
    Rejected_leave_count = ENEC_Rejected_Leave_req_api()




    # Total Approved req count
    Total_approved_count = Approved_pr_count + Approved_po_count + Approved_invoice_count + Approved_leave_count + Approved_ses_count

    # Total Rejected req count
    Total_Rejected_count = Rejected_pr_count + Rejected_po_count + Rejected_invoice_count + Rejected_leave_count + Rejected_ses_count






    # *********************************************************** BAR CHART ****************************************************************

    Opened_requests = []
    Closed_requests = []

    # PR opened and closed

    Opened_requests_pr = Pending_pr_count
    Opened_requests.append(Opened_requests_pr)

    Closed_requests_pr = Approved_pr_count + Rejected_pr_count
    Closed_requests.append(Closed_requests_pr)


    # PO opened and closed

    Opened_requests_po = pending_po_count 
    Opened_requests.append(Opened_requests_po)

    Closed_requests_po = Approved_po_count + Rejected_po_count
    Closed_requests.append(Closed_requests_po)

    
    # Invoice opened and closed

    Opened_requests_invoice = Pending_Invoice_count
    Opened_requests.append(Opened_requests_invoice)

    Closed_requests_invoice = Approved_invoice_count + Rejected_invoice_count
    Closed_requests.append(Closed_requests_invoice)

    # SES opened and closed 

    Opened_requests_ses = Pending_ses_count
    Opened_requests.append(Opened_requests_ses)

    Closed_requests_ses = Approved_ses_count + Rejected_ses_count
    Closed_requests.append(Closed_requests_ses)
    
    # leave req Opened and closed

    Opened_requests_leave = Pending_leave_count
    Opened_requests.append(Opened_requests_leave)

    Closed_requests_leave = Approved_leave_count + Rejected_leave_count
    Closed_requests.append(Closed_requests_leave)


    Bar_chart_data = {
        "Opened_requests":Opened_requests,
        "Closed_requests":Closed_requests
    }

    # *********************************************************** BAR CHART ****************************************************************

    # *********************************************************** DONUT CHART **************************************************************

    # pending pr count
    Donut_pending_pr_count = Pending_pr_count

    # pending po count 
    Donut_pending_po_count = pending_po_count 

    # pending Invoice count
    Donut_pending_invoice_count = Pending_Invoice_count


    # pending SES count
    Donut_pending_ses_count = Pending_ses_count

    # pending Leave count
    Donut_pending_leave_count = Pending_leave_count


    

    Donut_data = {
        "Donut_pending_pr_count":Donut_pending_pr_count,
        "Donut_pending_po_count":Donut_pending_po_count,
        "Donut_pending_invoice_count":Donut_pending_invoice_count,
        "Donut_pending_ses_count" : Donut_pending_ses_count,
        "Donut_pending_leave_count":Donut_pending_leave_count
    }


    # ****************************************************** recent requests ******************************************************************

    pendingpr = ENEC_Pending_PR_list_recent(data.username)
    pendingpo = ENEC_Pending_PO_list_recent(data.username)
    pendinginvoice = ENEC_Pending_invoice_list_recent(data.username)
    pendingses = ENEC_Pending_ses_list_recent(data.username)

    recent_req_dashboard = []

    #  Pending pr 

    recent_req_dashboard.append(pendingpr)
    
    # Pending po

    recent_req_dashboard.append(pendingpo)

    # pending invoice

    recent_req_dashboard.append(pendinginvoice)

    # pending ses

    recent_req_dashboard.append(pendingses)



    # ****************************************************** recent requests ******************************************************************



    # *********************************************************** DONUT CHART **************************************************************

    Dashboard_data = {

        "ticket_count":ticket_count,
        "Pending_pr_count":Pending_pr_count,
        "pending_po_count":pending_po_count,
        "Pending_Invoice_count":Pending_Invoice_count,
        "Pending_SES_Ccount": Pending_ses_count,
        "Pending_leave_count": Pending_leave_count,


        "Total_pending_req": Total_pending_req,


        "Total_approved_count": Total_approved_count,
        "Total_Rejected_count": Total_Rejected_count,


        "Bar_chart_data": Bar_chart_data,

    
        "Donut_chart_data": Donut_data,


        "Recent_requests": recent_req_dashboard


    }



    return Dashboard_data





#*********************************************************** Dashboard Combined API **********************************************************


#********************************************************** Recent requests API ********************************************************************



@app.post('/ENEC_Recent_requests')
def ENEC_Recent_requests(data:ENEC_Recent_requests):


    pendingpr = ENEC_Pending_PR_list_recent(data.username)
    pendingpo = ENEC_Pending_PO_list_recent(data.username)
    pendinginvoice = ENEC_Pending_invoice_list_recent(data.username)
    pendingses = ENEC_Pending_ses_list_recent(data.username)

    # print("app")

    # print(pendinginvoice)



    #  Pending pr 

    # recent_pr = pendingpr[-1]
    # print(recent_pr)

    recent_req_dashboard = []

    recent_req_dashboard.append(pendingpr)

    
    # Pending po


    # recent_po = pendingpo[-1]
    # print(recent_po)

    recent_req_dashboard.append(pendingpo)


    # pending invoice

    # recent_inv = pendinginvoice[-1]
    # print(recent_inv)

    recent_req_dashboard.append(pendinginvoice)


    # pending ses

    recent_req_dashboard.append(pendingses)



    print(recent_req_dashboard)


    return recent_req_dashboard




#********************************************************** Recent requests API ********************************************************************





# ********************************************************* Base64 file transfer **************************************************************************











# ********************************************************* Base64 file transfer **************************************************************************











   














if __name__ == '__main__':
    uvicorn.run(app,port=8000, log_level="info")