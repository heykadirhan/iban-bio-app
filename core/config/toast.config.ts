export const TOAST_CONFIG = {
    defaultOptions: {
        transition: {
            enter: 'ease-out',
            exit: 'ease-in',
        },
    },

    success: {
        style: {
            background: '#28a745',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
            fontWeight: 'bold',
            fontSize: '15px',
        },

        icon: '🎉',
    },

    error: {
        style: {
            background: '#dc3545',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
            fontWeight: 'bold',
            fontSize: '15px',
        },
    },

    loading: {
        style: {
            background: '#ffc107',
            color: '#343a40',
            borderRadius: '8px',
            padding: '16px',
            fontWeight: 'bold',
            fontSize: '15px',
        },
    },
};
