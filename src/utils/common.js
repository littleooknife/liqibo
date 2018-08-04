/**
 * 通用工具方法
 */

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
export default Type;