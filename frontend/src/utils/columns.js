export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Creation Date',
        accessor: 'date',
    },
    {
        Header: 'Audience Name',
        accessor: 'name',
    },
    {
        Header: 'Quantity',
        accessor: 'value',
    },
    {
        Header: 'Category',
        accessor: ({categorys}) => {
            if (categorys !== undefined && categorys.length > 0) {
                return categorys.reduce((accumulator, currentValue, index) => {
                    let separator = index === categorys.length - 1 ? '' : ', ';
                    return accumulator + currentValue.category + separator;
                },'');
            } else {
                return ''
            }
        },
    }
]

export const COLUMNS_STATUS = [
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Date',
        accessor: 'status_date',
    },
    {
        Header: 'Time',
        accessor: 'status_time',
    },
]



