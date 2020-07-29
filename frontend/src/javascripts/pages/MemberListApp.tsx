

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { MemberList } from '../components/MemberList';
import { FetchData } from '../api/FetchData';
import { Spacer } from '@zeit-ui/react';
import { BackGround } from '../pages/BackGround';
import { UserListBackGround } from '../pages/UserListBackGround';


export const MemberListApp = (props: any) => {
  const [fetchUsers, setFetchUsers] = useState([]);
  const [followUsers, setFollowUsers] = useState([]);

  // 開発時点ではログイン処理を飛ばしている為、ID1で固定。後々修正
  const currentUserId = props.currentUserData.id;
  const getFollowListUrl: string = `/users/follow_list/${currentUserId}`;
  console.log('getFollowListUrl', getFollowListUrl);
  useEffect(() => {
    if (currentUserId != 0) {

      FetchData(getFollowListUrl).then((res) => {
        console.log(res.data)
        setFollowUsers(res.data.map((el: any) => el.id));
      });
    }
    // }, [props.currentUserData]);
  }, [currentUserId]);
  console.log('followUsers', followUsers);

  const pushToFollowUsers = (target: number) => {
    console.log(target, 'ma');
    const arr = Array.from(followUsers);
    arr.push(target);
    setFollowUsers(arr);
  };

  const removeFromFollowUsers = (target: number) => {
    const arr = Array.from(followUsers);
    const nextFollowUsers = arr.filter((el) => el !== target);
    setFollowUsers(nextFollowUsers);
  };

  const fetchUsersUrl: string = '/users';

  useEffect(() => {
    FetchData(fetchUsersUrl).then((res) => setFetchUsers(res.data));
  }, []);

  // var particleHeight = document.getElementById('about-tsparticles');
  // particleHeight.style.height = 

  // (function () {

  //   // const particleHeight = document.getElementById('about-tsparticles');
  //   var listHeight = particleHeight.style.height

  //   console.log('listHeight', listHeight)


  // })();

  // const memberlistWrap = useRef(null);
  // console.log('memberlistWrap', memberlistWrap)
  // const memberlistWrapHeight = memberlistWrap.current.scrollHeight;
  // console.log('memberlistWrapHeight', memberlistWrapHeight)


  // useEffect(() => {

  //   (function () {
  //     var listHeight = document.getElementById('memberlist-wrap')
  //     console.log('listHeight', listHeight)
  //     console.log('listHeight.scrollHeight', listHeight.scrollHeight)

  //     console.log('listHeight.scrollHeight', listHeight.scrollHeight)
  //     var particleHeight = document.getElementById('about-tsparticles')
  //     console.log('particleHeight', particleHeight)
  //     particleHeight.style.height = listHeight.clientHeight.toString();
  //     console.log('particleHeight.style.height', particleHeight)
  //   })();

  // }, [])


  (function () {

    window.addEventListener('load', function (e) {
      var listHeight = document.getElementById('memberlist-wrap')
      // console.log('particleHeight', particleHeight)
      console.log('particleHeight', listHeight.clientHeight)
      var particleHeight = document.getElementById('about-tsparticles')
      console.log('particleHeight', particleHeight)
      particleHeight.style.height = listHeight.clientHeight.toString();
      console.log('particleHeight.style.height', particleHeight)
    });
  })();

  return (
    <React.Fragment>
      <Router>
        <div className="memberlist-background-wrap relative">
          <UserListBackGround />
          <div id="memberlist-wrap" className="memberlist-wrap absolute top-0" >
            {/* ref={memberlistWrap} */}
            <Spacer y={3} />

            <span>
              <MemberList
                {...props}
                fetchUsers={fetchUsers}
                followUsers={followUsers}
                pushToFollowUsers={pushToFollowUsers}
                removeFromFollowUsers={removeFromFollowUsers}
                currentUserData={props.currentUserData}
              />
            </span>

            <Switch>
              <Route path="/"></Route>
            </Switch>
          </div>

        </div>

      </Router>
    </React.Fragment>
  );
};
