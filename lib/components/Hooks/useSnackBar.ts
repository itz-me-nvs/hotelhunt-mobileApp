import {useState} from 'react';
import {StatusType} from '../../shared/models/component.type';

export default function useSnackBar() {
  const [snackbarProps, setSnackbarProps] = useState<{
    show: boolean;
    message: string;
    SnackBarType: StatusType;
  }>({
    message: '',
    show: false,
    SnackBarType: 'success',
  });

  const handleSnackbar = (props: {
    message: string;
    SnackBarType: StatusType;
    duration: number;
  }) => {
    const {message, SnackBarType, duration} = props;
    setSnackbarProps({
      message,
      show: true,
      SnackBarType,
    });
    setTimeout(() => {
      setSnackbarProps({
        message: '',
        show: false,
        SnackBarType: 'success',
      });
    }, duration || 1000);
  };

  return {snackbarProps, handleSnackbar};
}
