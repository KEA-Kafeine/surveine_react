import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import EditModal from "./EditModal";

const FolderSettings = (props) => {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if(modalRef.current && !modalRef.current.contains(event.target)) {
            props.onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 폴더 이름 변경
    const [showModifyFName, setShowModifyFName] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const clickModifyFName = () => {
        setShowModifyFName(true);
    };
    const handleNewFNameSave = (folderName) => {
        setNewFolderName(folderName);
        setShowModifyFName(false);
    };

    // 폴더 삭제
    const [showDelFolder, setShowDelFolder] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const clickDelFolder = () => {
        setShowDelFolder(true);
    };
    const handleConfirmDelFolder = (confDel) => {
        setConfirmDel(confDel);
        setShowDelFolder(false);
    }

    return (
        <Wrapper className="modal" ref={modalRef}>
            <div>
                <SetOption onClick={clickModifyFName}>폴더 이름 변경</SetOption>
                {showModifyFName && (
                    <EditModal onClose={() => setShowModifyFName(false)} onSave={handleNewFNameSave} boxId={props.boxId} boxName={props.boxName} type={props.type} what="modifyFolderName" />
                )}
            </div>

            <div>
                <SetOption onClick={clickDelFolder}>폴더 삭제</SetOption>
                {showDelFolder && (
                    <EditModal onClose={() => setShowDelFolder(false)} onSave={handleConfirmDelFolder} boxId={props.boxId} boxName={props.boxName} type={props.type} what="deleteFolder" />
                )}
            </div>
        </Wrapper>
    );
};
export default FolderSettings;

const Wrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 150px;
    background-color: #F8F8F8;
    color: black;
    border: 1px solid #000000;
    border-radius: 10px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    width: 6rem;
    z-index: 2;
`;

const SetOption = styled.button`
    margin: 0.2rem;
    text-align: center;
    font-size: 13px;
    border: none;
    background-color: #F8F8F8;
`;