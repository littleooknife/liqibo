/**
 * 根据数据来生成dom节点
 */

const analyzDom = (tag,props) => {
    let {attr={},style={},className=[],text=''}=props;
    if(!tag){
        console.warn('illegal tag');
        return ;
    }
    let node = document.createElement(tag);
    node = analyzAttr(attr,node);
    node = analyzStyle(style,node);
    node = analyzClass(className,node);
    if(text){
        let textNode = document.createTextNode(text);
        node.appendChild(textNode);
    }
    return node;
}

export default analyzDom;

const analyzAttr = (obj,node)=>{
    let keys = Object.keys(obj);
    if(keys.length>0){
        keys.forEach((key)=>{
            node[key]=obj[key];
        })
    }
    return node;
}

const analyzStyle = (styleObj,node)=>{
    let keys = Object.keys(styleObj);
    if(keys.length>0){
        keys.forEach((key)=>{
            node.style[key] = styleObj[key];
        })
    }
    return node;
}

const analyzClass = (classArr,node)=>{
    if(classArr.length>0){
        let className = classArr.join(' ');
        node.className = className;
    }
    return node;
}