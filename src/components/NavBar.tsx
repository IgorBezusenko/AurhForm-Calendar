import React, {FC} from 'react';
import {Col, Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom';
import {RouteNames} from "../router";
import {useTypesSelector} from '../hooks/useTypesSelector';
import {useAction} from '../hooks/useAction';

export const NavBar: FC = () => {
    const router = useHistory()
    const {logout} = useAction()
    const {isAuth, user} = useTypesSelector(state => state.auth)
    return (
        <>
            <Layout.Header>
              <Row justify={"end"}>
                  <>
                      {isAuth ?
                             <>
                                 <Col span={2} style={{color: "white", textAlign:"center"}}>{user.username}</Col>
                                 <Col span={2}>
                                     <Menu theme="dark" mode="horizontal" selectable={false}>
                                         <Menu.Item onClick={logout} key={1}>Выйти</Menu.Item>
                                     </Menu>
                                 </Col>
                             </>

                          :
                         <Col span={2}>
                             <Menu theme="dark" mode="horizontal" selectable={false}>
                                 <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={2}>Login</Menu.Item>
                             </Menu>
                         </Col>
                      }
                  </>

              </Row>
            </Layout.Header>

        </>
    );
}

