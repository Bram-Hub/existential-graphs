import * as joint from 'jointjs'
import _ from 'lodash'
import { graph } from '../index.js'
import { addPremiseTools } from '../tools/PremiseTools.js'
import '../css/Premise.css'
// class for premises (letters)

const PREMISE_DEFAULTS = {
  position: {
    x: 10,
    y: 10
  },
  size: {
    width: 40,
    height: 40
  },
  attrs: {
    rect: {
      class: 'premise_rect',
      width: 40, 
      height: 40, 
      fill: '#ffffff00', 
      stroke: 'black', 
      strokeWidth: 0
    },
    text: {
      class: 'premise_text',
      text: 'P',
      fontSize: 50,
      'ref-x': 0.5,
      'ref-y': 0.5,
      ref: 'rect',
      'x-alignment': 'middle',
      'y-alignment': 'middle'
    }
  }
}

export class Premise extends joint.dia.Element {
    defaults() {
        return {
            ...super.defaults,
            type: "dia.Element.Premise",
            attrs: {
                rect: PREMISE_DEFAULTS.attrs.rect,
                text: PREMISE_DEFAULTS.attrs.text
            }
        }
    }

    markup = [{
        tagName: "rect",
        selector: "body"
    },{
        tagName: "text",
        selector: "label"
    }]

    //custom constructor for shape, should more or less always use this over the default constructor
    create(config) {

        const options = _.cloneDeep(PREMISE_DEFAULTS);

        if (config) {
          options.position = Object.assign(options.position, config.position);
          options.size = Object.assign(options.size, config.size);
          options.attrs.rect = Object.assign(options.attrs.rect, config.attrs && config.attrs.rect);
          options.attrs.text = Object.assign(options.attrs.text, config.attrs && config.attrs.text);
        }

        let premise = new Premise(_.cloneDeep(options));
        console.log(premise);
        premise.addTo(graph)
        //add tools (some events events also)
        addPremiseTools(premise)

        return premise;
    }
}

Object.assign(joint.shapes, {
    "dia.Element": {
        Premise
    }
})

