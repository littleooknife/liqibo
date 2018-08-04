/**
 * 生成组件的接口
 */
import analyzDom from './analyzDom';

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

export default createComponent;
