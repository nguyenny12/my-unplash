import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setDeleteMode, setSelectedPhotoId } from '../photoSlice';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  border-radius: 1.5rem;
`;

const Container = styled.div`
  position: relative;

  &:hover > * {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const Label = styled.h5`
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  max-width: 70%;
  transition: all 200ms ease-in-out;

  font-weight: 600;
  font-size: 1rem;
  color: #fff;

  opacity: 0;
  visibility: hidden;
  transform: translateY(100%);
`;

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  font-size: 0.625rem;
  color: #eb5757;
  line-height: calc(12 / 10);

  padding: 0.3rem 0.7rem;
  border: 1px solid #eb5757;
  border-radius: 2.4rem;

  background-color: transparent;
  transition: all 200ms ease-in-out;

  opacity: 0;
  visibility: hidden;
  transform: translateY(-100%);
`;

function PhotoCard(props) {
  const dispatch = useDispatch();

  const {
    index,
    data: { url, label, id },
  } = props;

  const handleDeleteClick = () => {
    dispatch(setDeleteMode(true));
    dispatch(setSelectedPhotoId(id));
  };

  return (
    <Container>
      <Image src={url} alt={`p${index}`} />

      <Button onClick={handleDeleteClick}>delete</Button>

      <Label>{label}</Label>
    </Container>
  );
}

export default PhotoCard;
