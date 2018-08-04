import {domTree,domPropsTemplate} from './data';
import createComponent from './utils/createComponent';
import img from './img/menu.png';
import Type from './utils/common';
import styles from './app.css';

let app = document.getElementById('app');
let exampleData = {
    2: { attr: { src: img } },
    4: { text: 'Complete days', className:['red'],style:{'color':'#00ff00'}},
    5: { text: '99' }
}
for(let i=0;i<3;i++){
    let node = create(exampleData);
    app.appendChild(node);
}

function create(newPropsObj){
    let mergedPropsObj = deepCopy(domPropsTemplate);
    let keys = Object.keys(newPropsObj);
    keys.forEach((key)=>{
        mergedPropsObj[key]=mergeProps(mergedPropsObj[key],newPropsObj[key]);
    })
    let node = createComponent(domTree,mergedPropsObj);
    return node;
}

function deepCopy(objArr){
    if(Type.isObject(objArr)){
        return Object.assign({},objArr);
    }else if(Type.isArray(objArr)){
        let newObjArr = objArr.map((obj)=>{
            return Object.assign({},obj);
        })
        return newObjArr;
    }
}

function mergeProps(oldProps,newProps){
    let mergedProps={};
    let oldKeys = Object.keys(oldProps);
    let newKeys = Object.keys(newProps);
    let uniqueKeys = new Set([...oldKeys,...newKeys]);
    if(uniqueKeys.size<1) return mergedProps;
    uniqueKeys.forEach((k)=>{
        let oldIndex = oldKeys.indexOf(k);
        let newIndex = newKeys.indexOf(k);
        if(oldIndex === -1 || newIndex === -1){
            mergedProps[k] = newProps[k] || oldProps[k];
        }else{
            let oldValue = oldProps[k];
            let newValue = newProps[k];
            if(Type.isArray(oldValue) && Type.isArray(newValue)){
                mergedProps[k] = [...oldValue,...newValue];
            }else if(Type.isObject(oldValue) && Type.isObject(newValue)){
                mergedProps[k] = {...oldValue,...newValue};
            }else{
                mergedProps[k] = newValue;
            }
        }
    })
    return mergedProps;
}





