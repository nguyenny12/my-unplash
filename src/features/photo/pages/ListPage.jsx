import { useWindowSize } from '@react-hook/window-size';
import { unwrapResult } from '@reduxjs/toolkit';
import photoApi from 'api/photoApi';
import { AddModal } from 'components/common/AddModal';
import { DeleteModal } from 'components/common/DeleteModal';
import { Footer } from 'components/common/Footer';
import { Header } from 'components/common/Header';
import {
  useContainerPosition,
  useMasonry,
  usePositioner,
  useResizeObserver,
  useScroller,
} from 'masonic';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PhotoCard from '../components/PhotoCard';
import {
  fetchPhotoList,
  selectPhotoFilter,
  selectPhotoList,
  setDeleteMode,
  setFilter,
} from '../photoSlice';

const Container = styled.div`
  max-width: 75rem;
  padding: 1rem 2rem;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    padding: 1rem 1.5rem;
  }

  @media screen and (max-width: 575px) {
    padding: 1rem;
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function ListPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const filter = useSelector(selectPhotoFilter);
  const photoList = useSelector(selectPhotoList);

  const showDeleteModal = useSelector((state) => state.photo.deleteMode);
  const selectedPhotoId = useSelector((state) => state.photo.selectedPhotoId);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Masonry
  const containerRef = useRef(null);
  const [windowWidth, height] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [windowWidth, height]);
  const { scrollTop, isScrolling } = useScroller(offset);
  const positioner = usePositioner({ width, columnGutter: 16, columnWidth: 350 }, [
    photoList.length,
  ]);
  const resizeObserver = useResizeObserver(positioner);

  useEffect(() => {
    (async () => {
      try {
        const action = fetchPhotoList(filter);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log('Failed to fetch photo list: ', error);
      }

      setLoading(false);
    })();
  }, [filter, dispatch]);

  const handleAddPhotoClick = () => {
    setShowModal(true);
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
    dispatch(setDeleteMode(false));
  };

  const handleAddSubmit = async (data) => {
    try {
      await photoApi.add(data);
      enqueueSnackbar('Add photo successfully 🎉', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Add photo failed 😭', { variant: 'error' });
    }

    history.push('/');
  };

  const handleDeleteSubmit = async (password) => {
    if (password !== process.env.REACT_APP_PASSWORD) {
      enqueueSnackbar('Invalid password 😶', { variant: 'warning' });
      return;
    }

    try {
      await photoApi.delete(selectedPhotoId);
      enqueueSnackbar('Delete photo successfully 😭', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Delete photo failed 🥲', { variant: 'error' });
    }

    dispatch(setDeleteMode(false));
    history.push('/');
  };

  const handleSearchChange = (newFilter) => {
    const action = setFilter({
      ...filter,
      label_like: newFilter.q,
    });

    dispatch(action);
  };

  return (
    <Container>
      {loading && (
        <Loading>
          <ReactLoading type="bars" color="#444" height={48} width={48} />
        </Loading>
      )}

      {!loading && (
        <Header onAddPhotoClick={handleAddPhotoClick} onSearchChange={handleSearchChange} />
      )}

      {useMasonry({
        positioner,
        scrollTop,
        isScrolling,
        height,
        containerRef,
        items: photoList,
        resizeObserver,
        render: PhotoCard,
      })}

      {!loading && <Footer />}

      <AddModal
        isShow={showModal}
        onCloseModalClick={handleCloseModalClick}
        onAddSubmit={handleAddSubmit}
      />

      <DeleteModal
        isShow={showDeleteModal}
        onCloseModalClick={handleCloseModalClick}
        onDeleteSubmit={handleDeleteSubmit}
      />
    </Container>
  );
}

export default ListPage;
