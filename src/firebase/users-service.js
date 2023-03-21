import { async } from "@firebase/util";
import { getAuth, updateProfile } from "firebase/auth";
import{collection, doc,setDoc, where,query,getDocs, updateDoc} from "firebase/firestore"
import{db} from "./config"
import { ref, uploadBytes,getDownloadURL } from "firebase/storage"
import { store } from "../firebase/config"
import { v4 } from "uuid";

export async function createUserProfile(userId,data){
     setDoc(doc(db,'userChat',userId),{});
    return setDoc(doc(db,'users',userId),data);
}

export async function getUserInfo(){
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
}

export async function getUserProfile(email){
    const userQuery = query(collection(db,"users"), where("email","==",email));

    const results = await getDocs(userQuery);
    //comprueba el tamano de users y retorna la informacion de usuario
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }));
        const [user] = users;
        return user;
    }else{
        return null;
    }    
}

export async function getDoctorsInfo(){
    const usersQuery = query(collection(db,"users"), where("doctor","==",true));

    const results = await getDocs(usersQuery);
    //comprueba el tamano de users y retorna los usuarios
    if(results.size>0){
        const users = results.docs.map((item)=>({
            ...item.data(),
            id: item.id,
        }
        ));
        return users;
    }else{
        return null;
    }    
}

export const updateProfilePic = (user, result) => {

    const docRef = doc(db, "users", user.uid)

    const data= {
      profilePic: result
    }

    updateDoc(docRef, data).then(docRef => {
    console.log("A New Document Field has been added to an existing document");
})
    
}

export const uploadFile = async (file) => {
    const storageRef = ref(store, `profilePictures/${v4()}`);
    await uploadBytes (storageRef, file);
    const url =  await getDownloadURL(storageRef);
    return url;
  }

