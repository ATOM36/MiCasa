//? JS types
//? jquery
declare const $: JQueryStatic;

//? MomentJS
declare const moment: any;

//? SweetAlert2
declare const Swal: any;
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

/**
 * @returns An instance of `Swal` class
 * @see https://sweetalert2.github.io/
 */
export const getSweetAlert = () => Swal;
