/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  // throw new Error('Not implemented');
  const newObj = {
    height,
    width,
    getArea() {
      return this.height * this.width;
    },
  };
  return newObj;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  // throw new Error('Not implemented');
  const jsonArr = JSON.stringify(obj);
  return jsonArr;
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  // throw new Error('Not implemented');
  const newOb = JSON.parse(json);
  Object.setPrototypeOf(newOb, proto);
  return newOb;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  result: '',
  arrUsed: [],

  doubleCheck(arr) {
    const newArrell = arr.filter((i) => i === 0);
    const idArr = arr.filter((i) => i === 1);
    const pse = arr.filter((i) => i === 5);
    if (newArrell.length > 1 || pse.length > 1 || idArr.length > 1) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
  },

  findPos(arr) {
    arr.forEach((ell, i) => {
      if (ell > arr[i + 1]) {
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
      }
    });
  },

  newObj(ell, index) {
    const addobj = Object.create(this);
    addobj.arrUsed = this.arrUsed.concat(index);
    addobj.result = this.result + ell;
    this.doubleCheck(addobj.arrUsed);
    this.findPos(addobj.arrUsed);
    return addobj;
  },

  element(value) {
    const res = this.newObj(value, 0);
    return res;
  },

  id(value) {
    const res = this.newObj(`#${value}`, 1);
    return res;
  },

  class(value) {
    const res = this.newObj(`.${value}`, 2);
    return res;
  },

  attr(value) {
    const res = this.newObj(`[${value}]`, 3);
    return res;
  },

  pseudoClass(value) {
    const res = this.newObj(`:${value}`, 4);
    return res;
  },

  pseudoElement(value) {
    const res = this.newObj(`::${value}`, 5);
    return res;
  },

  combine(selector1, combinator, selector2) {
    const newObj = Object.create(this);
    newObj.result = `${selector1.result} ${combinator} ${selector2.result}`;
    return newObj;
  },

  stringify() {
    return this.result;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
