import computedBehavior from './computedBehavior'
import relationsBehavior from './relationsBehavior'
import safeSetDataBehavior from './safeSetDataBehavior'
import funcBehavior from './funcBehavior';

export interface IComponentOptions {
  externalClasses: string[];
  behaviors: any[];
  methods?: any;
  options?: any;
}

export interface IBaseComponentParams {
  useFunc?: boolean;
  useField?: boolean;
  useExport?: boolean;
  methods?: Record<string, any>;
  options?: any;
  externalClasses?: string[]
}



const baseComponent = <T, D>(params: IBaseComponentParams) => {
  const { useFunc, useField, useExport, methods, options, externalClasses = [], ...otherOptions } = params;

  const componentOptions: IComponentOptions = {
    externalClasses: ['wux-class',
    'wux-hover-class', ...externalClasses],
    behaviors: [computedBehavior, relationsBehavior, safeSetDataBehavior],
    options: {
      multipleSlots: true,
      addGlobalClass: true,
    },
    ...otherOptions
  };

  let otherBehaviors: any[] = [];

  if(useFunc) {
    otherBehaviors.push(funcBehavior);
  }
  if(useField) {
    otherBehaviors.push('wx://form-field')
  }
  if(useExport) {
    otherBehaviors.push('wx://form-field');
    componentOptions.methods = {
      export () {
        return this
    },
    ...methods,
    }
  }

  componentOptions.behaviors = [...componentOptions.behaviors, ...otherBehaviors]


  if(options) {
    componentOptions.options = {
      multipleSlots: true,
      addGlobalClass: true,
      ...options
    }
  }


  return Component<T,D | IComponentOptions>(componentOptions)
}


export default baseComponent
