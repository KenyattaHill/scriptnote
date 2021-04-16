import { useTypedSelector } from '.';

export default function useCumulativeCode(id: string) {
  return useTypedSelector(({ cells: { data, order } }) => {
    const currentIndex = order.indexOf(id);

    const showFunction = `
      import _React from 'react';
      import _ReactDom from 'react-dom';

      var show = value => {
        const root = document.querySelector('#root')
        if(typeof value === 'object'){
          if(value.$$typeof && value.props) {
            _ReactDom.render(value, root)
          } else{
            root.innerHTML = JSON.stringify(value, null, 2)
          }
        } else {
          root.innerHTML = value;
        }
      }
    `;

    const showFunctionNoop = `var show = () => {}`;

    return order.reduce<string[]>((total, cellId, index) => {
      const cell = data[cellId];
      if (cell.type === 'code' && index <= currentIndex) {
        if (cell.id === id) {
          total.push(showFunction);
        } else {
          total.push(showFunctionNoop);
        }
        total.push(cell.content);
      }
      return total;
    }, []);
  }).join('\n');
}
