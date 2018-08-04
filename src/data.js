/**
 * 组件的数据结构
 */
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

export { domTree, domPropsTemplate }