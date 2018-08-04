/** common utils */

const judgeTypeFactory = () => {
    const jsType = ['String', 'Number', 'Boolean', 'Array', 'Function', 'Object', 'Null', 'Undefined'];
    const Type = {};
    jsType.forEach((item) => {
        Type['is' + item] = (value) => {
            let typeStr = Object.prototype.toString.call(value).slice(8);
            if (typeStr.indexOf(item) === 0) {
                return true;
            } else {
                return false;
            }
        }
    })
    return Type;
}
const Type = judgeTypeFactory();

/**  analyzDom  utils */

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

/** createComponent utils */
const createComponent=(tree, props)=>{
    let key = tree.key;
    let nodeProps = props[key] || {};
    let node = analyzDom(tree.type, nodeProps);
    let items = tree.items;
    if(items&& items.length>0){
        items.forEach((item)=>{
            let childNode = createComponent(item,props);
            node.appendChild(childNode);
        })
    }
    return node;
}

/** create utils */
export default function create(newPropsObj){
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

/** data struct */
const domTree = {
    key: 0,
    type: 'div',
    items: [
        {
            key: 1,
            type: 'div',
            items: [
                {
                    key: 2,
                    type: 'img'
                }
            ]
        },
        {
            key: 3,
            type: 'div',
            items: [
                {
                    key: 4,
                    type: 'div'
                },
                {
                    key: 5,
                    type: 'div'
                }
            ]
        }
    ]
}


//dom的属性 key attr={} class=[] style={} text='' 可以考虑把事件单独提出来
const domPropsTemplate = {
    0: { className: ['container'] },
    1: { className: ['left'] },
    2: {},
    3: { className: ['right'] },
    4: { className: ['content'], style:{'fontSize':'12px'}},
    5: { className: ['number'] }
}