import React, {useMemo} from 'react'
import { useTable, usePagination } from 'react-table'
import { COLUMNS } from '../../utils/columns'
import Title from '../Title/Title';
import moment from 'moment';
import './AudienceTable.css';

function AudienceTable({
  openAddNewAudienceForm,
  deletAudience,
  audiences,
  today,
}) {
  
  const audienceData = [...audiences].map((audience) => {
    return {
      id: audience.id,
      name: audience.name,
      date: moment().format('DD.MM.YYYY'),
      value: '1000', // default value
      categorys: audience.categorys,
    };
  }).reverse();

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => audienceData, [audiences]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const { pageIndex } = state;

  return (
    <section className='table'>
      <Title
        pageIndex={pageIndex}
        nextPage={nextPage}
        previousPage={previousPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        openAddNewAudienceForm={openAddNewAudienceForm}
        today={today}
      />

      <table className='table__wrapper' {...getTableProps()}>
        <thead className='table-header__wrapper'>
          {headerGroups.map((headerGroup) => (
            <tr
              className='table-column__wrapper'
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th className='table-column__cell' {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
              <th className='table-column__cell'></th>
            </tr>
          ))}
        </thead>
        <tbody className='table-body__wrapper' {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className='table-row__wrapper' {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className='table-row__cell' {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
                <td className='table-row__cell'>
                  <button
                    className='table-button'
                    onClick={() => deletAudience(row.original.id)}
                  ></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default AudienceTable




