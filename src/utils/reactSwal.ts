import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

const ReactSwal = withReactContent(Swal);

const customRSwalFire = (
  icon: SweetAlertIcon,
  title: string,
  html?: string,
) => {
  const swalOptions: SweetAlertOptions = {
    icon,
    title,
  };
  if (html) {
    swalOptions.html = html;
  }
  ReactSwal.fire(swalOptions);
};

export default customRSwalFire;
