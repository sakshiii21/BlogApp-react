import conf from '../conf/conf.js'
import {Client,ID, Databases, Storage, Query} from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title,slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        }catch(error){
            console.log("Appwrite Error:: createPost :: error", error);
        }
    }
    async updatePost(slug, {title,content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }catch(error){
            console.log("Appwrite Error:: updatePost :: error", error);
        }
    }
    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                slug
            )
            return true;            
        }catch(error){
            console.log("Appwrite Error:: deletePost :: error", error);
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                slug
            )
        }catch(error){
            console.log("Appwrite Error:: getPost :: error", error);
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwritDatabaseId,
                conf.appwritCollectionId,
                queries,
            )
        }catch(error){
            console.log("Appwrite Error:: getPosts :: error", error);
            return false;
        }
    }

    // file upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwritBucketId,
                ID.unique(),
                file
            );
        }catch(error){          
            console.log("Appwrite Error:: uploadFile :: error", error);
        }
    }

    //delete file
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwritBucketId,
                fileId
            );
        }catch(error){
            console.log("Appwrite Error:: deleteFile :: error", error);
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwritBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;