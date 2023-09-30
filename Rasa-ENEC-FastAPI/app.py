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


class UserLogin(BaseModel):
    username: str
    password: str


class Pending_pr_list(BaseModel):
    username: str
    # password: str


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

class ENEC_approved_po_item_info(BaseModel):
    pono: str
    username : str

class ENEC_rejected_po_item_info(BaseModel):
    pono: str
    username : str

class pending_po_approval(BaseModel):
    username: str
    pono : str
    comment: str | None

class pending_po_rejection(BaseModel):
    username: str
    pono : str
    comment: str | None


class IT_ticket_creation(BaseModel):
    tickettype : str
    Hardwaretype : str
    monitorsize : str | None

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

    }
    collection.insert_one(user_data)


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

    url = 'http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_pr_pending?sap-client=100'

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZfmPrPending(f'{data.username}') 
    listofobj = result[0]
    pendingpr = ['PR '+str(i.Banfn) for i in listofobj]

    print(pendingpr)


    return pendingpr


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

        db = client["ENEC_RasaChatbot"]
        collection = db["Approved_PR"]
        document = {"Purchase Requisition Number": "PR "+f"{data.prno}", "Status":"Approved","Comment":f"{data.comment}","username": f"{data.username}"}
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

        db = client["ENEC_RasaChatbot"]
        collection = db["Rejected_PR"]
        document = {"Purchase Requisition Number": "PR "+f"{data.prno}", "Status":"Rejected","Comment":f"{data.comment}","username": f"{data.username}"}
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

        print(item_list_description)

    return item_list_description


@app.post('/pending_po_list')
def pending_po_list(data: pending_po_list):

    url = "http://dxbktlds4.kaarcloud.com:8000/sap/bc/srt/wsdl/flv_10002A1011D1/bndg_url/sap/bc/srt/scs/sap/zsd_mm_po_pending?sap-client=100" 

    transport = HttpAuthenticated(username=sap_username, password=sap_password)
    client = Client(url,transport=transport)
    result = client.service.ZfmPoPending(f'{data.username}') 
    listofobj = result[0]
    pendingpo = ['PO '+str(i.Ebeln) for i in listofobj]

    print(pendingpo)

    return pendingpo

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
def approved_po_item_info(data : ENEC_approved_po_item_info):

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
def rejected_po_item_info(data : ENEC_rejected_po_item_info):

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

        db = client["ENEC_RasaChatbot"]
        collection = db["Approved_PO"]
        document = {"Purchase Order Number": "PO "+f"{data.pono}", "Status":"Approved","Comment":f"{data.comment}","username": f"{data.username}"}
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

        db = client["ENEC_RasaChatbot"]
        collection = db["Rejected_PO"]
        document = {"Purchase Order Number": "PO "+f"{data.pono}", "Status":"Rejected","Comment":f"{data.comment}"}
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
    if(data.Hardwaretype == "Monitor"):
        data = {
            "Ticket ID": ticket_number,
            "Ticket type": data.tickettype,
            "Hardware type": data.Hardwaretype,
            "Monitor Size": data.monitorsize
        }
    else:
        data = {
            "Ticket ID": ticket_number,
            "Ticket type": data.tickettype,
            "Hardware type": data.Hardwaretype
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

    it_tickets = []

    for i in a:
        print(i)
        it_tickets.append(i['Ticket ID'])


    return it_tickets


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
            approved_pr_list.append(i['Purchase Requisition Number'])

    print(approved_pr_list)

    return approved_pr_list


@app.post('/ENEC_approved_po_list_mongo')
async def ENEC_approved_po_list_mongo(data : ENEC_approved_po_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Approved_PO"]
    a=collection.find()

    approved_po_list = []

    for i in a:
        if data.username == i["username"]:
            approved_po_list.append(i['Purchase Order Number'])

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

    approved_pr_list = []

    for i in a:
        if data.username == i["username"]:
            approved_pr_list.append(i['Purchase Requisition Number'])

    return approved_pr_list

@app.post('/ENEC_rejected_po_list_mongo')
async def ENEC_rejected_po_list_mongo(data : ENEC_rejected_po_list_mongo):

    db = client["ENEC_RasaChatbot"]
    collection = db["Rejected_PO"]
    a=collection.find()

    approved_po_list = []

    for i in a:
        if data.username == i["username"]:
            approved_po_list.append(i['Purchase Order Number'])

    return approved_po_list


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































if __name__ == '__main__':
    uvicorn.run(app,port=8000, log_level="info")