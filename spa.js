app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"/Canifa1/home.html",
        controller:"myController"
    })
    .when("/login",{
        templateUrl:"/Canifa1/Login.html",
        controller:"loginCtrl"
    })
    .when("/buy/:id",{
        templateUrl:"/Canifa1/product_item.html",
        controller:"spCtrl"
    })
    .when("/giohang",{
        templateUrl:"/Canifa1/giohang.html",
        controller:"cartCtrl"
    })
    .when("/manage",{
        templateUrl:"/Canifa1/manage.html",
        controller:"manageCtrl"
    })
})
app.controller("spCtrl",function( $scope,$http,$routeParams){
    $scope.title="Prodcut Manager",
    $scope.id=$routeParams.id;
    $scope.loadData=function(){
    $http.get("http://localhost:3000/products")
    .then(res=>{
        $scope.products=res.data
    })
   }
   $scope.loadData()
   $scope.getProduct=function(){
    $http.get("http://localhost:3000/products/"+ $scope.id)
    .then(res=>{
        
        $scope.product=res.data
        console.log($scope.product)
    })
   }
   $scope.getProduct()
   $scope.buy=function(){
    $http.post("http://localhost:3000/cart",$scope.product)
    .then(res=>{
        alert("Sản phẩm đã thêm vào giỏ thành công !")
        $scope.loadData()
    })
   }
})
app.controller("cartCtrl",function($scope,$http,$routeParams){
    $scope.loadData=function(){
        $http.get("http://localhost:3000/cart")
        .then(res=>{
            $scope.items=res.data
        })
    }
    $scope.loadData()
    $scope.getAmount=function(){
        var amount=0;
        for(var i=0;i< $scope.items.length;i++){
                amount +=$scope.items[i].price*$scope.items[i].quantity
        }
        return amount;
    }
    $scope.deleteIt=function(id){
        $http.delete("http://localhost:3000/cart/" +id)
        .then(res=>{
            $scope.loadData()
        })
    }
})
app.controller("loginCtrl",function($scope,$http,$routeParams){
    $scope.loadData=function(){
        $http.get(" http://localhost:3000/users")
        .then(res=>{
            $scope.users=res.data
            console.log($scope.users)
        })
    }
    $scope.loadData()
    $scope.res=function(){
        $http.post(" http://localhost:3000/users",$scope.us)
        .then(res=>{
            console.log($scope.us.mail)
            console.log($scope.us.pass)
            $scope.loadData()
        })
    }
    $scope.login=function(){
        var check=checkLogin($scope.us.mail,$scope.us.pass);
        if(check != null){
            alert("Đăng Nhập Thành Công ")
            window.location.href="/Canifa1/Canifa.html";
        }
        else{
            alert("Đăng Nhập Thất Bại ")
        }
    }
    function checkLogin(mail,pass){
        for(var i=0;i<$scope.users.length;i++){
            if($scope.users[i].mail==mail && $scope.users[i].pass==pass){
                return $scope.users[i]
                console.log($scope.users[i])
               
            }
        }
    }
})
app.controller("manageCtrl",function($scope,$http,$routeParams){
    $scope.loadData=function(){
        $http.get(" http://localhost:3000/products")
        .then(res=>{
            $scope.products=res.data
        })
    }
    $scope.loadData()
    $scope.pr="";
    $scope.addPr=function(){
        $http.post(" http://localhost:3000/products",$scope.pro)
        .then(res=>{
            $scope.loadData()
            alert("Thêm Thành Công ")
        })
    }
    $scope.delPr=function(id){
        $http.delete(" http://localhost:3000/products/"+id)
        .then(res=>{
            $scope.loadData()
        })
    }
    $scope.begin = 0;
    $scope.pageCount = Math.ceil($scope.products.length / 8);
    // $scope.last = function () {
    //     $scope.begin = ($scope.pageCount - 1) * 8;
    // }
    // $scope.first = function () {
    //     $scope.begin = ($scope.pageCount - 1);
    // }
    $scope.next = function () {
        console.log($scope.pageCount)
        if ($scope.begin < ($scope.pageCount - 1) * 8) {
            $scope.begin += 8
        }
        console.log($scope.begin)
    }
    $scope.prev = function () {
        if ($scope.begin >= 0 ) {
            $scope.begin -= 8
        }
    }
    $scope.editPr=function(id){
        $http.get("http://localhost:3000/products/"+id)
        .then(res=>{
            $scope.editProduct=res.data 
        })        
    }
    $scope.updatePr=function(){
        $http.put("http://localhost:3000/products/"+$scope.editProduct.id,$scope.editProduct)
        .then(res=>{
          $scope.loadData()
        })
      }
})

