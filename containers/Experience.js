import { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import TableExperience from '../components/TableExperience';
import ModalExperience from '../components/ModalExperience';

function Experience({ user, mutateUser }) {

  const [isOpen, setIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState('view');
  const [selectedExp, setSelectedExp] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const { data, mutate } = useSWR('/api/experience');

  const handleAddExperience = (experience) => {
    setTypeModal('add');
    setIsOpen(true);
  };

  const closeModal = () => {
    mutate(`/api/experience`)
    setIsOpen(false);
  };

  const handleDeleteExperience = async (index) => {
    mutate(`/api/experience`, {}, false);

    try {
      await fetcher(`/api/experience?index=${index}`, {
        method: 'DELETE',
      });

      mutate(`/api/experience`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewExperience= (exp) => {
    setTypeModal('view');
    setSelectedExp(exp);
    setIsOpen(true);
  };

  const handleEditExperience = (exp, index) => {
    setTypeModal('edit');
    setSelectedExp(exp);
    setSelectedIndex(index)
    setIsOpen(true);
  };

  return (
    <>
      <div className='flex md:flex-row flex-col justify-between item-center'>
        <div className='flex flex-row items-center mb-4 gap-3 md:hidden'>
          <div className='relative w-full text-xl md:text-3xl'>
            Experience
          </div>
          <button
            className='bg-secondary py-2 rounded-md text-center w-full text-white hover:bg-primary'
            onClick={handleAddExperience}
            >
            Add Experience
          </button>
        </div>
      </div>
    
      <TableExperience 
        experience={data && data.experience}
        onDelete={handleDeleteExperience}
        onView={handleViewExperience}
        onEdit={handleEditExperience}
      />

      <ModalExperience
        open={isOpen}
        setOpen={setIsOpen}
        onClose={closeModal}
        type={typeModal}
        mutate={mutate}
        experience={selectedExp}
        index={selectedIndex}
      />
    </>
  );
}

export default Experience;