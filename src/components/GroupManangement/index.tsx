import React, { ChangeEvent, useEffect, useState } from 'react'
import classes from './styles.module.scss'
import http from 'services/axiosClient';
import { Group } from 'props/StyleProps';
import { ArrowUpIcon } from './icon';
import { ControlPointOutlined } from '@mui/icons-material';
import { Menu as MenuUI, TextField, Button } from '@mui/material';

export default function GroupManagement() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [deleted, setDeleted] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateGroupId, setUpdateGroupId] = useState<number | null>(null);
  const [updateGroupName, setUpdateGroupName] = useState<string>('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortQuery, setSortQuery] = useState<string>('id_asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [createData, setCreateData] = useState({
    groupName: ''
  })

  const getGroupList = () => {
    const sortField = sortQuery.split('_')[0];
    const sortDirection = sortQuery.split('_')[1];
    http.get(`/groups?page=${currentPage}&size=${itemsPerPage}&sort=${sortField},${sortDirection}&search=${searchQuery}`)
      .then(response => {
        setGroups(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getGroupList()
  }, [deleted, updateSuccess, currentPage, itemsPerPage, searchQuery, sortQuery]);

  const handleCreateGroup = () => {
    if (!createData.groupName) {
      alert('Group name cannot be empty');
      return;
    }

    const data = {
      name: createData.groupName
    };

    http.post('/groups', data)
      .then(response => {
        console.log(response.data);
        setUpdateSuccess(true);
        getGroupList()
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdateGroup = (id: number) => {
    if (!updateGroupName) {
      alert('Group name cannot be empty');
      return;
    }
    const data = {
      name: updateGroupName
    };

    http.put(`/groups/${id}`, data).then(response => {
      console.log(response.data);
      setUpdateSuccess(true);
      getGroupList()
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
        getGroupList()
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


  const handleSortChange = (sortQuery: string) => {
    setSortQuery(sortQuery);
  };

  const handleSearchQueryChange = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleShowCreate = (e: any) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleChangeGroupName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setCreateData(prev => ({ ...prev, [key]: e.target.value }));
  }

  return (
    <div className={classes.groupContent}>
      <h1>Group Management</h1>
      <div className={classes.tableContent}>
        <div className={classes.topTable}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{}} type='text' placeholder='Search' value={searchQuery} onChange={(e) => handleSearchQueryChange(e.target.value)} />
            <ControlPointOutlined aria-label='create' style={{ cursor: 'pointer' }} onClick={handleShowCreate} />
            <MenuUI
              id="create"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.createBlock}
            >
              <TextField id="outlined-basic"
                label="New name Group"
                variant="outlined"
                value={createData.groupName}
                onChange={(event) => handleChangeGroupName(event, 'groupName')} />
              <Button
                variant="contained"
                onClick={handleCreateGroup}
              >
                Create
              </Button>
            </MenuUI>
          </div>
          <div>
            <p>Sort by:</p>
            <select value={sortQuery} onChange={(e) => handleSortChange(e.target.value)}>
              <option value="id_asc">ID Ascending </option>
              <option value="id_desc">ID Descending</option>
              <option value="name_asc">Name Ascending<ArrowUpIcon /></option>
              <option value="name_desc">Name Descending</option>
            </select>
          </div>
        </div>
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
                {/* id số lẻ ẩn button delete */}
                <td>
                  <button className={classes.groupManagement__btn} onClick={() => handleUpdateButtonClick(group.id)}>Update</button>
                  {group.id % 2 === 0 ? (
                    <button className={classes.groupManagement__btn} onClick={() => handleDeleteGroup(group.id)}>Delete</button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showUpdateForm && (
          <form onSubmit={handleUpdateFormSubmit}>
            <TextField id="outlined-basic" label="Group Name" variant="outlined" value={updateGroupName} onChange={(e) => setUpdateGroupName(e.target.value)} />
            <Button variant="contained" type="submit">Update</Button>
          </form>
        )}
        <div className={classes.bottomTable}>
          <p>Row per page: </p>
          <select style={{ padding: 4.5, borderRadius: 8 }} value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <button className={classes.groupManagement__btn} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <button className={classes.groupManagement__btn} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(groups.length / itemsPerPage)}>Next</button>

        </div>
      </div>
    </div>
  )
}
