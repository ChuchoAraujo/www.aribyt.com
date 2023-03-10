'''
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
'''
from flask import Flask, request, jsonify, url_for, Blueprint,Response,json
from api.models import db, User, TablaClasificadora, TablaMecanico, TablaRechazos,TablaAdmin
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS, cross_origin
from sqlalchemy import text
from mailjet_rest import Client



api = Blueprint('api', __name__)

CORS(api)

API_KEY = ("56ee6826d943f4fa88828699d5563fd3")
SECRET_MAIL = ("9e33e2db8a1cf750936f4457c746e094")
mailjet = Client(auth=(API_KEY, SECRET_MAIL), version='v3.1')

#-------------------------------------------------- USERS --------------------------------------------------------------------------------------#


@api.route('/users', methods=['GET'])
def get_users():
    call_users = User.query.all()
    result = [element.serialize() for element in call_users]
    response_body = {'msg': 'Get create successfully!'}
    return jsonify(result), 200

#---------------------------------------- LOGIN ----------------------------------------#

@api.route('/acceso', methods=['POST'])
def login():
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    role = request.json.get('role', None)
    turno = request.json.get('turno', None)

    user = User.query.filter_by(email=email).filter_by(password=password).filter_by(role=role).first()
  
    if user == None:
        return jsonify({'msg': 'User, password or role Not exist!'}), 401
    
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token,"user":user.id}), 200 


#---------------------------------------- LOGIN ADMINISTRADOR----------------------------------------#

@api.route('/accesoAdmin', methods=['POST'])
def loginAdmin():
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    role = request.json.get('role', None)

    user = TablaAdmin.query.filter_by(email=email).filter_by(password=password).first()
  
    if user == None:
        return jsonify({'msg': 'User, password or role Not exist!'}), 401
    
    if user:
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token,"user":user.id}), 200 



#---------------------------------------- REGISTER ----------------------------------------#  
@api.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    role = request.json.get('role', None)

    user_already_exist = User.query.filter_by(username=username).filter_by(email=email).filter_by(password=password).first()

    if user_already_exist:
        return jsonify({'msg': 'Mismo email o contrase??a'}), 401

    else:
        new_user = User(username=username, email=email, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'user': new_user.serialize()}), 200

#---------------------------------------- DELETE USER ----------------------------------------# 
# 

# ### DELETE USERS
@api.route('/delete', methods= ['POST'])
def deleteUser():
    try:
        user_id = request.json.get('user_id')
        byeMember = db.session.query(User).get(user_id)
        db.session.delete(byeMember)
        db.session.commit()
        response_body = {"msg": "User borrado","user": user_id}
        return jsonify(response_body)
    except:
        return jsonify({'mensaje':'no se ha borrado'}) 

    
@api.route('/modificar',methods=['PUT'])
def modificarUser():
    user_id = request.json.get('user_id')
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    role = request.json.get('role')
    
    try:
        editMember = db.session.query(User).get(user_id)
        editMember.username = username
        editMember.email = email
        editMember.password = password
        editMember.role = role
        db.session.commit()
        return jsonify({"message": "modificado correctamente"}),200

    except error:
        return  jsonify({"message": "Campos incorrectos"}),401 

#---------------------------------------- PRIVATE ----------------------------------------#

@api.route('/private', methods=['GET'])
@jwt_required()
def token_acces():
   current_user_id = get_jwt_identity()
   user = User.query.get(current_user_id)
   
   if user == None:
        return jsonify({'msg': 'User, password or role Not exist!'}), 401
   
   return jsonify({
    'user': user.serialize(),
    'current_user' : current_user_id
   }), 200


@api.route('/administrador', methods=['GET'])
@jwt_required()
def token_accesAdmin():
   current_user_id = get_jwt_identity()
   user = TablaAdmin.query.get(current_user_id)
   
   if user == None:
        return jsonify({'msg': 'User, password or role Not exist!'}), 401
   
   return jsonify({
    'user': user.serialize(),
    'current_user' : current_user_id
   }), 200



#-------------------------------------------------- TABLA CLASIFICADORA --------------------------------------------------------------------------------------#

@api.route('/clasificadora', methods=['GET'])
def get_clasificadora():
    call_clasificadora = TablaClasificadora.query.all()
    result = [element.serialize() for element in call_clasificadora]
    response_body = {'msg': 'Get clasificadora OK'}
    return jsonify(result), 200


@api.route('/clasificadora', methods=['POST'])
@cross_origin()
@jwt_required()
def clasificadora():

    user_id = request.json.get('user_id', None)
    cajas = request.json.get('cajas', None)
    articulo = request.json.get('articulo', None)
    lote = request.json.get('lote', None)
    jaulas = request.json.get('jaulas', None)
    pedido = request.json.get('pedido', None)
    personal = request.json.get('personal', None)
    problema = request.json.get('problema', None)
    accion = request.json.get('accion', None)
    tiempo = request.json.get('tiempo', None)
    velocidad = request.json.get('velocidad', None)
    gramos = request.json.get('gramos', None)
    fecha = request.json.get('fecha', None)
    horas = request.json.get('horas', None)
    turno = request.json.get('turno',None)

    user_id = user_id = get_jwt_identity()

    try:
        newRegister = TablaClasificadora(
        user_id=user_id,
        cajas=cajas, 
        articulo=articulo,
        lote=lote, 
        jaulas=jaulas, 
        pedido=pedido, 
        personal=personal, 
        problema=problema, 
        accion=accion,
        tiempo=tiempo, 
        velocidad=velocidad, 
        gramos=gramos, 
        fecha=fecha, 
        horas=horas,
        turno=turno)

        db.session.add(newRegister)
        db.session.commit()

    except Exception as e:
        return jsonify({"error": str(e)}), 402


    return jsonify({
        'register': newRegister.serialize(),
        'identity': get_jwt_identity()
    }), 201


#---------------------------------------- TABLA MECANICO ----------------------------------------#

@api.route('/mecanico', methods=['GET'])
def get_mecanico():
    call_get_mecanico = TablaMecanico.query.all()
    result = [element.serialize() for element in call_get_mecanico]
    response_body = {'msg': 'Get mecanico OK'}
    return jsonify(result), 200


@api.route('/mecanico', methods=['POST'])
@cross_origin()
@jwt_required()
def mecanico():

    user_id = request.json.get('user_id', None)
    problema = request.json.get('problema', None)
    accion = request.json.get('accion', None)
    fecha = request.json.get('fecha', None)
    horas = request.json.get('horas', None)
    turno = request.json.get('turno',None)

    user_id = user_id = get_jwt_identity()

    try:
        newRegister = TablaMecanico(
        user_id=user_id,
        fecha=fecha, 
        horas=horas,
        problema=problema, 
        accion=accion,
        turno=turno)

        db.session.add(newRegister)
        db.session.commit()

    except Exception as e:
        return jsonify({"error": str(e)}), 402


    return jsonify({
        'register': newRegister.serialize(),
        'identity': get_jwt_identity()
    }), 201


#---------------------------------- TABLA ENCARGADO ---------------------------

@api.route('/encargado', methods=['GET'])
def get_encargado():
    call_users = User.query.all()
    result_user = [element.serialize() for element in call_users]
    call_clasificadora = TablaClasificadora.query.all()

    result_clasificadora = [element.serialize() for element in call_clasificadora]
    call_get_mecanico = TablaMecanico.query.all()

    result_Mecanico = [element.serialize() for element in call_get_mecanico]
    response_body = {'msg': 'Gets OKS'}

    return jsonify({
        'user': result_user, 
        'clasificadora': result_clasificadora, 
        'mecanico': result_Mecanico 
        }), 200


def filtro_usuario(valor):
    userName=""
    sentencia = db.session.query(User).filter(User.id==valor).all()
    for result in sentencia:
        userName=result.username
    return userName


@api.route('/join', methods=['POST'])
@cross_origin()
def get_join():
    turno1 = request.json.get('turno')
    fecha1 = request.json.get('fecha')
    arrayClasificadora=[]
    arrayMecanico=[]
    arrayRechazos=[]
    suma=[]
    resultadoClasificadora = db.session.query(User,TablaClasificadora). \
        select_from(User).join(TablaClasificadora). \
            filter(TablaClasificadora.turno==turno1).filter(TablaClasificadora.fecha==fecha1).all()
    
    resultadoMecanico = db.session.query(User,TablaMecanico). \
        select_from(User).join(TablaMecanico). \
            filter(TablaMecanico.turno==turno1).filter(TablaMecanico.fecha==fecha1).all()    

    resultadoRechazos = db.session.query(User,TablaRechazos). \
        select_from(User).join(TablaRechazos). \
            filter(TablaRechazos.turno==turno1).filter(TablaRechazos.fecha==fecha1).all()  

    for usuario,clasificadora in resultadoClasificadora:
        arrayClasificadora.append({
            'usuarioClasificadora': filtro_usuario(clasificadora.user_id),
            'idclasificadora':clasificadora.user_id,
            'problemaClasificadora':clasificadora.problema,
            'horaClasificadora':clasificadora.horas,
            'cajas':clasificadora.cajas,
            'fecha':clasificadora.fecha,
            'articulo':clasificadora.articulo,
            'lote': clasificadora.lote,
            'jaulas': clasificadora.jaulas,
            'pedido': clasificadora.pedido,
            'personal': clasificadora.personal,
            'accionClasificadora': clasificadora.accion,
            'tiempo': clasificadora.tiempo,
            'velocidad': clasificadora.velocidad,
            'gramos':clasificadora.gramos
            })
    
    for usuario,clasificadora in resultadoClasificadora:
        suma.append(clasificadora.cajas)
    valorSuma=sum(suma)

    for usuario,mecanico in resultadoMecanico:
        arrayMecanico.append({
            'usuarioMecanico': filtro_usuario(mecanico.user_id),
            'userMecanico':usuario.username,
            'problemaMecanico':mecanico.problema,
            'accionMecanico':mecanico.accion,
            'horaDelMecanico':mecanico.horas
            })

    for usuario,rechazos in resultadoRechazos:
        arrayRechazos.append({
            'usuarioRechazos': filtro_usuario(rechazos.user_id),
            'fichas':rechazos.fichas,
            'paneles':rechazos.paneles,
            'jaula':rechazos.jaula
            })
          
    return jsonify({'clasificadora': arrayClasificadora, 'mecanico': arrayMecanico ,'rechazos':arrayRechazos,'sumaCajas':valorSuma})

#---------------------------------------- ENVIAR MAIL ----------------------------------------#
@api.route('/sendMail', methods=['POST'])
@cross_origin()
def sendMail():
    turno1 = request.json.get('turno')
    fecha1 = request.json.get('fecha')
 
    try:
        arrayClasificadora=[]
        resultadoClasificadora = db.session.query(User,TablaClasificadora). \
        select_from(User).join(TablaClasificadora). \
            filter(TablaClasificadora.turno==turno1).filter(TablaClasificadora.fecha==fecha1).all()
            
        for usuario,clasificadora in resultadoClasificadora:
            arrayClasificadora.append({
            'usuarioClasificadora': filtro_usuario(clasificadora.user_id),
            'idclasificadora':clasificadora.user_id,
            'problemaClasificadora':clasificadora.problema,
            'horaClasificadora':clasificadora.horas,
            'cajas':clasificadora.cajas,
            'fecha':clasificadora.fecha,
            'articulo':clasificadora.articulo,
            'lote': clasificadora.lote,
            'jaulas': clasificadora.jaulas,
            'pedido': clasificadora.pedido,
            'personal': clasificadora.personal,
            'accionClasificadora': clasificadora.accion,
            'tiempo': clasificadora.tiempo,
            'velocidad': clasificadora.velocidad,
            'gramos':clasificadora.gramos
            })

        html_string="<ul>\n"
        for item in arrayClasificadora:
            html_string+="<li>"+str(item)+"</li>\n"
        html_string+="</ul>"

        data = {
            'Messages': [
                {
                    "From": {
                        "Email": "josgrehd@aribyt.com  ",
                        "Name": "Mensaje del Encargado"
                    },
                    "To": [
                        {
                            "Email": "josgrehd@aribyt.com  ",
                            "Name": "josgrehd"
                        }
                    ],
                    "Subject": "Datos de consulta",
                    "TextPart": "estos son los datos",
                    "HTMLPart": "<h1>Datos de Clasificadora</h1>"+html_string,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        }
        result = mailjet.send.create(data=data)
        return jsonify({'mensaje': "enviado"})
    except:
        return jsonify({'error':'error al ejecutar la funcion de enviar mail'})

#---------------------------------------- TABLA RECHAZOS ----------------------------------------#

@api.route('/rechazos', methods=['GET'])
def get_rechazos():
    get_rechazos =TablaRechazos.query.all()
    result = [element.serialize() for element in get_rechazos]
    response_body = {'msg': 'Get Rechazos OK'}
    return jsonify(result), 200


@api.route('/rechazos', methods=['POST'])
@cross_origin()
@jwt_required()
def rechazos():

    user_id = request.json.get('user_id', None)
    fecha = request.json.get('fecha', None)
    turno = request.json.get('turno', None)
    fichas = request.json.get('fichas', None)
    paneles = request.json.get('paneles', None)
    jaula = request.json.get('jaula',None)

    user_id = user_id = get_jwt_identity()

    try:
        newRegister = TablaRechazos(
        user_id=user_id,
        fecha=fecha, 
        turno=turno,
        fichas=fichas, 
        paneles=paneles,
        jaula=jaula)

        db.session.add(newRegister)
        db.session.commit()

    except Exception as e:
        return jsonify({"error": str(e)}), 402


    return jsonify({
        'register': newRegister.serialize(),
        'identity': get_jwt_identity()
    }), 201
