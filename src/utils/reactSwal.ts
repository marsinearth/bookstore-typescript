import Swal, { SweetAlertOptions, SweetAlertType } from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

const ReactSwal = withReactContent(Swal);

const customRSwalFire = (
  type: SweetAlertType,
  title: string,
  html?: string,
) => {
  const swalOptions: SweetAlertOptions = {
    type,
    title,
  };
  if (html) {
    swalOptions.html = html;
  }
  ReactSwal.fire(swalOptions);
};

export default customRSwalFire;
