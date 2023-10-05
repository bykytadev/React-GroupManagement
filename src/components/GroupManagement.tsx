import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from 'styles/GroupManagement.module.scss';
import { Group } from 'props/StyleProps';
import http from 'services/axiosClient';

const GroupManagement = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [name, setName] = useState<string>('');
  const [deleted, setDeleted] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateGroupId, setUpdateGroupId] = useState<number | null>(null);
  const [updateGroupName, setUpdateGroupName] = useState<string>('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<string>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobXRydW5nIiwiZXhwIjoxNjk3MDgyODc0fQ.UQSTLKbBOWJe7zogpLb4J1rQs-m3ToyaNBhFlDYnWlo5BbjihnyNk5HxgR8r4frQ7x_oWNZdUz2xw9ZShmSkhw';

  // const config = {
  //   headers: { Authorization: `Bearer ${token}` }
  // };

  const getGrouList = () => {
    http.get(`/groups?page=${currentPage}&size=${itemsPerPage}&sort=${sortField},${sortDirection}&search=${searchQuery}`)
      .then(response => {
        setGroups(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    // http.get(`/groups?page=${currentPage}&size=${itemsPerPage}&sort=${sortField},${sortDirection}&search=${searchQuery}`)
    //   .then(response => {
    //     setGroups(response.data.content);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    getGrouList()
  }, [deleted, updateSuccess, currentPage, itemsPerPage, sortField, sortDirection, searchQuery]);

  const handleCreateGroup = () => {
    const data = {
      name: name
    };

    http.post('/groups', data)
      .then(response => {
        console.log(response.data);
        setUpdateSuccess(true);
        getGrouList()
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdateGroup = (id: number) => {
    const data = {
      name: updateGroupName
    };

    // axios.put(`http://localhost:8080/api/v1/groups/${id}`, data, config)
    // .then(response => {
    //   console.log(response.data);
    //   setUpdateSuccess(true);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
    http.put(`/groups/${id}`, data).then(response => {
      console.log(response.data);
      setUpdateSuccess(true);
      getGrouList()
    })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteGroup = (id: number) => {
    http.delete(`/groups/${id}`)
      .then(response => {
        console.log(response.data);
        setDeleted(true);
        getGrouList()
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdateButtonClick = (id: number) => {
    const group = groups.find(group => group.id === id);
    if (group) {
      setUpdateGroupId(id);
      setUpdateGroupName(group.name);
      setShowUpdateForm(true);
    }
  };

  const handleUpdateFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdateGroup(updateGroupId!);
    setShowUpdateForm(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleSortFieldChange = (sortField: string) => {
    setSortField(sortField);
  };

  const handleSortDirectionChange = (sortDirection: string) => {
    setSortDirection(sortDirection);
  };

  const handleSearchQueryChange = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className={styles.groupManagement}>
      <h1>Group Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>
                <button className={styles.groupManagement__btn} onClick={() => handleUpdateButtonClick(group.id)}>Update</button>
                <button className={styles.groupManagement__btn} onClick={() => handleDeleteGroup(group.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUpdateForm && (
        <div className={styles.groupManagement__form}>
          <h2>Update Group</h2>
          <form onSubmit={handleUpdateFormSubmit}>
            <div className={styles.groupManagement__formWrapper}>
              <label htmlFor="updateGroupName">Name:</label>
              <input className={styles.groupManagement__input} type="text" id="updateGroupName" value={updateGroupName} onChange={(e) => setUpdateGroupName(e.target.value)} />
            </div>
            <button className={styles.groupManagement__btn} type="submit">Update</button>
          </form>
        </div>
      )}
      <div className={styles.groupManagement__form}>
        <h2>Create Group</h2>
        <form onSubmit={handleCreateGroup}>
          <div className={styles.groupManagement__formWrapper}>
            <label htmlFor="name">Name:</label>
            <input className={styles.groupManagement__input} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <button className={styles.groupManagement__btn} type="submit">Create</button>
        </form>
      </div>
      <div className={styles.groupManagement__pagination}>
        <h2>Pagination</h2>
        <p>Page {currentPage} of {Math.ceil(groups.length / itemsPerPage)}</p>
        <button className={styles.groupManagement__btn} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button className={styles.groupManagement__btn} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(groups.length / itemsPerPage)}>Next</button>
        <select className={styles.groupManagement__select} value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className={styles.groupManagement__sorting}>
        <h2>Sorting</h2>
        <p>Sort by:</p>
        <select className={styles.groupManagement__select} value={sortField} onChange={(e) => handleSortFieldChange(e.target.value)}>
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
        <select className={styles.groupManagement__select} value={sortDirection} onChange={(e) => handleSortDirectionChange(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className={styles.groupManagement__search}>
        <h2>Search</h2>
        <input className={styles.groupManagement__input} type="text" value={searchQuery} onChange={(e) => handleSearchQueryChange(e.target.value)} />
      </div>
    </div>
  );

}
export default GroupManagement;