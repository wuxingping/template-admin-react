import React, { Suspense } from "react";
import {Route} from "react-router-dom";
import { lazy } from "react";
import { useHistory } from "react-router-dom";
function generateRouter(routers,history) {
  return routers.map((item) => {
    let component = item.path.replace("/", "");
    if (item.children && item.children.length > 0) {
      return generateRouter(item.children,history);
    }
    return (
      <Route
        path={item.path}
        component={lazy(() =>
          import(`page/${component}`).catch((err) => {                 
            return  import('../../404').then(Component => Component);
          })
        )}
        key={item.path}
      />
    );
  });
}
function Content(props) {
  const { routers } = props;
  const history = useHistory();
  return (
    <div className="cm-m-02">
      {routers && routers.length > 0 ? (        
        <Suspense fallback={<div>loading...</div>}>
          {generateRouter(routers,history)}
        </Suspense>
      ) : null}
    </div>
  );
}

export default React.memo(Content);
