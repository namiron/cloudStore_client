# Cloudv Store Front

like google cloud I decided to create something similar and call. It Cloud Store
This application has been designed as a full stack application using M.E.R.N technology stack

this repository shows the creation of the front end of the Cloud Store
applications

## Technologies

@reduxjs/toolkit
axios
react
react-dom
react-icons
react-redux
react-router-dom
sass
typeScript

##  Descripton

There is in the progect  login registration authorization step
<img width="600" alt="user" src="https://github.com/user-attachments/assets/946eb2af-8dbe-4ff8-8747-b3d68b116c01">


since the project involves working with files, I created drag and drop functionality

    //---------------------DragFunctions
    const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(),
            event.stopPropagation(),
            setDragEnter(true)
    }
    const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(),
            event.stopPropagation(),
            setDragEnter(false)
    }
    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(),
            event.stopPropagation(),
            setDragEnter(true)
    }


    const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        if (files) {
            const filesArray = Array.from(files);
            filesArray.forEach(file => {
                dispatch(uploadFile({ file, dirId: currentDir }));
            });
        }
        setDragEnter(false)

    }
    //---------------------DragFunctions

    <div className={stylesDisk.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragOverHandler} >

on the Cloud Store it is possible not only to upload and download files, but also to create them
popup is used for this

<img width="500" alt="popap" src="https://github.com/user-attachments/assets/b0fa67a2-c7e1-45db-a280-b52f1c8b477c">



login registration authorization is currently implemented

<img width="600 " alt="registration" src="https://github.com/user-attachments/assets/41e8fd59-1d65-4d78-8ace-755f2250263c">

<img width="600" alt="login" src="https://github.com/user-attachments/assets/361e1c15-4457-49cd-b275-a8c92cbc989e">

## At the moment the project is in development and requires improvements and testing


