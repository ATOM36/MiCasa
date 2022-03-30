//? JS types
declare const $: JQueryStatic;

declare const moment: any;

//? Helper functions
/**
 * @returns A reference to `JQueryStatic` element
 * @see https://api.jquery.com/
 */
export const getJquery = () => $;

/**
 * @returns A reference to MomentJS `moment` element
 * @see https://momentjs.com/docs/
 */
export const getMoment = () => moment;
