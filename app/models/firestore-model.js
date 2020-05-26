
const FirestoreModel = function(firestore){

    this.init = function(table,params){
        return new Promise((resolve,reject)=>{
            resolve('Not aplicate to Firestore'); //because you can insert objects and atributtes additionals in insert and update
        });      
    };

    this.clear = function(table){
        return new Promise((resolve,reject)=>{
            resolve('For security firebase not permit delete all users with an action');
        });
    };

    //method to insert in collection one object id is automatic

    this.insert = function(table,params){
        return new Promise((resolve,reject)=>{
            firestore.collection(table).add(params)
            .then((response)=>{
                params.id = response.id;
                resolve(params);
            })
            .catch((error)=>{
                reject(error);
            });
        });    
    };

    //method to show all objetcs of a collection 

    this.getAll = function(table){
        return new Promise((resolve,reject)=>{
            firestore.collection(table).get()
            .then((registers)=>{
                let response = [];
                registers.forEach((register) => { //parameter of function call back
                    let element = register.data();
                    element.id = register.id;
                    response.push(element);
                });
                resolve(response);
            })
            .catch((error)=>{
                reject(error);
            });
        });        
    };

    //method to obtain data object since id

    this.getById = function(table,id){
        return new Promise((resolve,reject)=>{
            firestore.collection(table).doc(id).get()
            .then((register)=>{
                if(register.exists){
                    let response = register.data();
                    response.id = register.id;
                    resolve(response);
                }else{
                    reject({error:'Document in the collection '+table+' not existis'});
                }
            })
            .catch((error)=>{
                reject(error);
            });
        });    
    };

    //method to update objects with attributes

    this.update = function(table,params,id){
        return new Promise((resolve,reject)=>{
            firestore.collection(table).doc(id).update(params)
            .then((response)=>{
                params.id = response.id;
                resolve(params);
            })
            .catch((error)=>{
                reject(error);
            });
        });       
    };

    //method to eliminate one object since id
    
    this.delete = function(table,id){
        return new Promise((resolve,reject)=>{
            firestore.collection(table).doc(id).delete()
            .then((response)=>{
                resolve('Document deleted with id:' +id);
            })
            .catch((error)=>{
                reject(error);
            });
        });           
    };

    
    return this;
}

module.exports = FirestoreModel;