import { FC, useState } from 'react';

import styles from './findImage.module.scss';
import Exit from '../../ui/exit';
import { useGetImagesQuery } from '../../../store/api/imageEndpoints';
import Loading from '../../ui/loading';

type FindImageType = {
  setFindImage: React.Dispatch<React.SetStateAction<boolean>>;
};

const FindImage: FC<FindImageType> = ({ setFindImage }) => {
  const [value, setValue] = useState<string>('');

  const { isLoading, isError, data, error } = useGetImagesQuery(
    { page: 1, query: value },
    { skip: !value },
  );

  console.log(error);

  return (
    <section className={styles.import} onClick={() => setFindImage((prev) => !prev)}>
      <article className={styles.import_inner} onClick={(e) => e.stopPropagation()}>
        <button className={styles.exit} onClick={() => setFindImage((prev) => !prev)}>
          <Exit fill='black' />
        </button>

        <input
          type='text'
          placeholder='Find Image'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id='FindImage'
        />
        <div>
          {isLoading ? (
            <Loading width='15px' height='15px' />
          ) : data ? (
            <ul></ul>
          ) : (
            isError && <h1 className={styles.message}>Something went wrong...</h1>
          )}
        </div>
      </article>
    </section>
  );
};

export default FindImage;
