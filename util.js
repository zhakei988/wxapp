var Api = require('../utils/api.js');
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDate() {
  var date=new Date();
  var year = date.getFullYear();
  var month = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)
  var day = date.getDate()<10?'0'+date.getDate():date.getDate();



  return year.toString()+month.toString()+day.toString();
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function setNav(txt)
  {
    setTimeout(function(){
      wx.setNavigationBarTitle({
      title: txt
    })
    },20)
  }
 function pie(opt)
  {
wx.getSystemInfo({
  success: function(res) {
    opt.width=(opt.width/375)*res.windowWidth;
    opt.height=opt.width;
  }
})
    var context = wx.createContext();
    var array = opt.data;
    var colors = opt.color;
    var total = 0;
    var radius = opt.width/2;
    var name=opt.name;
    var txtsit=[];
    for (var index = 0; index < array.length; index++) {
      total += parseInt(array[index]*100)/100;
    }
    array.push(parseInt((100-total)*100)/100);
    name.push("其他");
    total+=100-total;
    var point = {x: opt.width/2, y:  opt.height/2};
    /*  循环遍历所有的pie */


    
  for (var i = 0; i < array.length; i++) {
    context.beginPath();
//    起点弧度
    var start =4.7;
    if (i > 0) {
//      计算开始弧度是前几项的总和，即从之前的基础的上继续作画
      for (var j = 0; j < i; j++) {
        start += array[j] / total * 2 * Math.PI; 
      }
    }
   
//   1.先做第一个pie
//    2.画一条弧，并填充成三角饼pie，前2个参数确定圆心，第3参数为半径，第4参数起始旋转弧度数，第5参数本次扫过的弧度数，第6个参数为时针方向-false为顺时针
    context.arc(point.x, point.y, radius, start, array[i] / total * 2 * Math.PI,false);
  //   3.连线回圆心
    context.lineTo(point.x, point.y);
  //   4.填充样式
  if(typeof(colors[i])=='undefined')
  {
    context.setFillStyle('#79868E');
  }else
  {
    context.setFillStyle(colors[i]);
  }
  //context.fillText(name[i],point.x+Math.cos(start) * radius/2 ,point.y+Math.sin(start) * radius/2 );
  //   5.填充动作
    context.fill();
    context.closePath();
  }
  for (var a = 0; a < array.length; a++) {
  context.beginPath();
  var start2 =4.7;
    if (a > 0) {
//      计算开始弧度是前几项的总和，即从之前的基础的上继续作画
      for (var c = 0; c < a; c++) {
        start2 += array[c] / total * 2 * Math.PI; 
      }
    }
  if(a==array.length-1)
  {
    txtsit.push({x:point.x+Math.cos(start2+start2/8) * (radius-radius/3),y:point.y+Math.sin(start2+start2/8) * (radius-radius/3),name:name[a],data:array[a]})
  }else
  {
    txtsit.push({x:point.x+Math.cos(start2+start2/20) * (radius-radius/3),y:point.y+Math.sin(start2+start2/20) * (radius-radius/3),name:name[a],data:array[a]})
  }
  context.setFillStyle("#ffffff");
  context.arc(point.x, point.y,radius/4,0,Math.PI*2,true)
  context.setFontSize(8)
  context.fillText(txtsit[a].name, txtsit[a].x,  txtsit[a].y)
  context.fillText(txtsit[a].data+'%', txtsit[a].x,  txtsit[a].y+10)
  context.fill();
   context.closePath();
}
    wx.drawCanvas({
      canvasId: opt.id,
      actions: context.getActions()
    });
  }
  function graph(opt)
  {
    wx.getSystemInfo({
  success: function(res) {
    opt.width=(opt.width/375)*res.windowWidth;
    opt.height=(opt.height/667)*res.windowHeight;
  }
})
    var max = opt.date_y[0],min = opt.date_y[0];
    for(var i=1;i< opt.date_y.length;i++){ 
        if(max< opt.date_y[i])max= opt.date_y[i];
        if(min> opt.date_y[i])min= opt.date_y[i];
    }
    var ctx = wx.createContext();
    for(var i=0;i<opt.date_x.length;i++)
    {
        ctx.setFillStyle("#4AB974");
        ctx.rect(parseInt(opt.width/opt.date_x.length)*i-4+parseInt(opt.width/opt.date_x.length)/4+opt.width/opt.date_x.length, opt.height-(opt.height-50)/(max-min)*opt.date_y[i]-opt.height/10, parseInt(opt.width/opt.date_x.length)/2, (opt.height-50)/(max-min)*opt.date_y[i]);
        ctx.fill();
    }
    ctx.setFontSize(8)
    ctx.setFillStyle("#aaaaaa");
    for(var i=0;i<10;i++)
    {
        var c = ((parseInt((max+4)/8)*i).toString().length)*4;
        ctx.fillText(parseInt((max+4)/8)*i,10-c,(opt.height - opt.height/10*i)-20);
    }
    for(var i=1;i<=opt.date_x.length;i++)
    {
        ctx.fillText(opt.date_x[i-1],parseInt(opt.width/opt.date_x.length)*i,(opt.height));
    }
    wx.drawCanvas({
      canvasId: opt.id,
      actions: ctx.getActions()
    });
  }
  function showload(txt)
  {
    wx.showToast({
      title: txt,
      icon: 'loading',
      duration: 1000000
    })
  }
  function hideload()
  {
    setTimeout(function(){
      wx.hideToast()
    },2000)
  }
  //分时图
  var quote = {
    fsdraw:function(opt)
    {
    wx.getSystemInfo({
      success: function(res) {
        opt.width=(opt.width/375)*res.windowWidth;
        opt.height=(opt.height/667)*res.windowHeight;
      }
    })
    var w=opt.width;
    var h=opt.height;
    opt=opt.data;
    var zs=opt.pc==''?0:parseFloat(opt.pc);
    var zg=opt.high==''?0:parseFloat(opt.high);
    var zd=opt.low==''?0:parseFloat(opt.low);
    var jk=opt.op==''?0:parseFloat(opt.op);
    var zjy=opt.turnover;
    var arrprc=[];
    var arrjprc=[];
    var arrfz=[];
    var arrtxt={};
    var option = {};
    if(zg-zs > zs - zd)
    {
      arrtxt.lt_1=zg;
      arrtxt.lt_2=Math.round(((zs+(zg-zs)/2))*100)/100;
      arrtxt.lt_3=zs;
      arrtxt.lt_4=Math.round((zs-(zg-zs)/2)*100)/100;
      arrtxt.lt_5=zs-(zg-zs);
      arrtxt.rt_1=((zg-zs)/zs*100).toFixed(2)+'%';
      arrtxt.rt_2='0.00%';
      arrtxt.rt_3=-((zg-zs)/zs*100).toFixed(2)+'%';
    }else
    {
      arrtxt.lt_1=zs-zd+zs;
      arrtxt.lt_2=Math.round((zs+(zs-zd)/2)*100)/100;
      arrtxt.lt_3=zs;
      arrtxt.lt_4=Math.round((zs-(zs-zd)/2)*100)/100;
      arrtxt.lt_5=zd;
      arrtxt.rt_1=((zs-zd)/zs*100).toFixed(2)+'%';
      arrtxt.rt_2='0.00%';
      arrtxt.rt_3=-((zs-zd)/zs*100).toFixed(2)+'%';
    }
    arrtxt.lt_6=0;
    arrtxt.lt_7=0;
    var d=opt.mins;
    for(var i in d)
    {
      if(d[i].last=="")
      {
        arrprc.push(zs)
      }else
      {
        arrprc.push(parseFloat(d[i].last))
      }
      if(d[i].turnover=="" || d[i].vol=="")
      {
        arrjprc.push(parseFloat(jk))
      }else
      {
        //arrjprc.push(d[i].turnover/d[i].vol/100)
        arrjprc.push(d[i].turnover/d[i].vol/100)
      }
      arrfz.push(d[i].vol==""?0:d[i].vol)
    }
    arrtxt.lt_6=Math.max.apply(Math, arrfz);
    arrtxt.lt_7=arrtxt.lt_6/2;
    arrtxt.m=['09:30','10:30','11:30','14:00','15:00'];
    option={
      width:w,
      height:h,
      zs:zs,
      zg:zg,
      zd:zd,
      jk:jk,
      zjy:zjy,
      arrprc:arrprc,
      arrjprc:arrjprc,
      arrfz:arrfz,
      arrtxt:arrtxt
    }
    var context =wx.createContext();
    this.createcontext(option,context)
  },
  createcontext:function(option,context)
  {
    var yg_l=(option.height/2-20)/6;
    var w = option.width/2-2;
    var h = option.height/2;
    context.setFontSize(10)
    //画线
    context.beginPath()
    context.setStrokeStyle("#dcdcdc");
    context.moveTo(0,yg_l)
    context.lineTo( w,yg_l);
    context.stroke();
    context.moveTo(0,yg_l*3)
    context.lineTo(w,yg_l*3);
    context.stroke();
    context.moveTo(0,yg_l*5+20)
    context.lineTo(w,yg_l*5+20);
    context.stroke();
    context.moveTo(w/4,0)
    context.lineTo(w/4,h);
    context.stroke();
    context.moveTo(w/4*2,0)
    context.lineTo(w/4*2,h);
    context.stroke();
    context.moveTo(w/4*3,0);
    context.lineTo(w/4*3,h);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.setStrokeStyle("#990000");
    context.moveTo(0,yg_l*2);
    context.lineTo(w,yg_l*2);
    context.stroke();
    context.clearRect(0,yg_l*4,w,20);
    for(var i=0;i<w;i++)
    {
      if(i%2==0)
      {
        continue;
      }
      context.clearRect(i,yg_l*2-1, 1,2);
    }
    context.closePath();
    //填充文字
    context.fillText(option.arrtxt.lt_3.toFixed(2), 2, yg_l*2-2)
    context.fillText(option.arrtxt.rt_2, w-(option.arrtxt.rt_2.length*5), yg_l*2-2)
    context.setFillStyle("#990000");
    context.fillText(option.arrtxt.lt_1.toFixed(2), 2, 10)
    context.fillText(option.arrtxt.lt_2.toFixed(2), 2, yg_l)
    context.fillText(option.arrtxt.rt_1, w-(option.arrtxt.rt_1.length*5), 10)
    context.setFillStyle("#0f990f");
    context.fillText(option.arrtxt.lt_4.toFixed(2), 2, yg_l*3-2)
    context.fillText(option.arrtxt.lt_5.toFixed(2), 2, yg_l*4-2)
    context.fillText(option.arrtxt.rt_3, w-(option.arrtxt.rt_3.length*5), yg_l*4-2)
    context.setFillStyle("#000000");
    context.fillText(option.arrtxt.lt_6, 2, yg_l*4+30)
    context.fillText(option.arrtxt.lt_7, 2, yg_l*5+30)
 
    context.fillText(option.arrtxt.m[0], 2, yg_l*4+14);
    context.fillText(option.arrtxt.m[1], 2+w/4*1-16, yg_l*4+14);
    context.fillText(option.arrtxt.m[2], 2+w/4*2-16, yg_l*4+14);
    context.fillText(option.arrtxt.m[3], 2+w/4*3-16, yg_l*4+14);
    context.fillText(option.arrtxt.m[4], 2+w/4*4-26, yg_l*4+14);
    //画框
    context.beginPath()
    context.setLineWidth(1);
    context.setStrokeStyle("#000000");
    context.rect(0, 0, w, yg_l*4);
    context.stroke();
    context.closePath()
    context.beginPath()
    context.rect(0, yg_l*4+20, w, yg_l*2);
    context.stroke();
    context.closePath();
    //画蓝线
    context.beginPath()
    ///context.setFillStyle("#0D97FF");
    context.setStrokeStyle("#0D97FF");
    var _h = parseFloat((yg_l*4)/(option.arrtxt.lt_1-option.arrtxt.lt_5));
    var _w = w/240;
    context.moveTo(0,yg_l*2)
    for(var i = 0 ; i<option.arrprc.length;i++)
    {
      var x=i*_w;
      var y='';
      if(option.zg-option.zs > option.zs-option.zd)
      {
        y = ((parseFloat(option.zg-(option.arrprc[i]))*_h));
      }else
      {
        y = ((yg_l*4)-(parseFloat((option.arrprc[i])-option.zd)*_h));
      }
      context.lineTo(x,y);  
      x=null;y=null;
    }
    i=null;x=null;y=null;
    context.stroke();
    context.closePath();
    //画黄线
    context.beginPath()
    context.setStrokeStyle("#DAA520");
    context.moveTo(0,(yg_l*4)-(option.jk-option.zd)*_h);
    for(var j = 0 ; j<option.arrjprc.length;j++)
    {
      var xx=j*_w;
      var yy='';
      if(isNaN(option.arrjprc[j]))
      {
        option.arrjprc[j]=option.arrjprc[j-1]
      }
      if(option.zg-option.zs > option.zs-option.zd)
      {
           yy = ((parseFloat(option.zg-(option.arrjprc[j]))*_h));
      }else
      {
        yy = ((yg_l*4)-(parseFloat((option.arrjprc[j])-option.zd)*_h));
      }
      context.lineTo(xx,yy);  
      xx=null;yy=null;
    }
    context.stroke();
    context.closePath();
    //画柱形图
    var _fh=parseFloat((yg_l*2)/(option.arrtxt.lt_6));
    for(var c = 0 ; c<option.arrfz.length;c++)
    {
      context.beginPath();
      if(option.arrprc[c] >option.arrprc[c-1])
      {
        context.setStrokeStyle("#f73a4c");
      }else
      {
        context.setStrokeStyle("#009900");
      }
      var fx = c*_w;
      context.moveTo(fx,h);
      var fy =h-parseFloat((option.arrfz[c]))*_fh;
      context.lineTo(fx,fy);
      context.stroke();
      context.closePath();
    }
    wx.drawCanvas({
      canvasId: 'canvas1',
      actions:  context.getActions()
    })
  },
  fsquote:function(data){
    var _this=this;
    var opt={
            width:566,
            height:466,
            data:data
          }
     this.fsdraw(opt);
  },
  rdraw:function(opt)
  {
    wx.getSystemInfo({
      success: function(res) {
        opt.width=(opt.width/375)*res.windowWidth;
        opt.height=(opt.height/667)*res.windowHeight;
      }
    })
    var w=opt.width;
    var h=opt.height;
    opt=opt.data;
    var date=opt.trdate==''?0:parseFloat(opt.trdate);
    var zs=opt.pc==''?0:parseFloat(opt.pc);
    var zg=opt.high==''?0:parseFloat(opt.high);
    var zd=opt.low==''?0:parseFloat(opt.low);
    var jk=opt.op==''?0:parseFloat(opt.op);
    var price=opt.last==''?0:parseFloat(opt.last);
    var vol=opt.vol==''?0:parseFloat(opt.vol);
    var zjy=opt.turnover;
    var arrprc=[];
    var arrjprc=[];
    var arrfz=[];
    var arrtxt={};
    var option = {};

    arrtxt.lt_6=0;
    arrtxt.lt_7=0;
    var d=opt.days;
    for(var i in d)
    {
      arrprc.push(d[i].last);
      arrfz.push(d[i].vol)
    }
    var _g = (Math.max.apply(Math, arrprc)-Math.min.apply(Math, arrprc))/4;
    arrtxt.lt_1=Math.max.apply(Math, arrprc);
    arrtxt.lt_2=_g*3;
    arrtxt.lt_3=_g*2;
    arrtxt.lt_4=_g*1;
    arrtxt.lt_5=Math.min.apply(Math, arrprc);
    arrtxt.lt_6=Math.max.apply(Math, arrfz);
    arrtxt.lt_7=Math.max.apply(Math, arrfz)/2;
    arrtxt.lt_8=opt.days[0].trdate;
    arrtxt.lt_9=opt.days[(opt.days.length-1)].trdate;
    option={
      arrprc:d,
      arrtxt:arrtxt,
      arrfz:arrfz,
      width:w,
      height:h
    }
    var context =wx.createContext();
    this.rcreatecontext(option,context)
  },
  rcreatecontext:function(option,context)
  {
    var yg_l=(option.height/2-20)/6; 
    var w = option.width/2;
    var h = option.height/2;
    context.setFontSize(10)
    //画线
    context.beginPath()
    context.setStrokeStyle("#000000");
    context.moveTo(0,0)
    context.lineTo( w,0);
    context.stroke();
    context.moveTo(0,yg_l*4)
    context.lineTo( w,yg_l*4);
    context.stroke();
    context.closePath();
    context.beginPath()
    context.setStrokeStyle("#dcdcdc");
    context.moveTo(0,yg_l)
    context.lineTo( w,yg_l);
    context.stroke()
    context.moveTo(0,yg_l*2)
    context.lineTo( w,yg_l*2);
    context.stroke();
    context.moveTo(0,yg_l*3)
    context.lineTo( w,yg_l*3);
    context.stroke();
    context.moveTo(0,yg_l*5+20)
    context.lineTo(w,yg_l*5+20);
    context.stroke();
    context.closePath();
    //填充文字
    context.fillText(option.arrtxt.lt_1.toFixed(2), 2, 10)
    context.fillText(option.arrtxt.lt_2.toFixed(2), 2, yg_l)
    context.fillText(option.arrtxt.lt_3.toFixed(2), 2, yg_l*2-2)
    context.fillText(option.arrtxt.lt_4.toFixed(2), 2, yg_l*3-2)
    context.fillText(option.arrtxt.lt_5.toFixed(2), 2, yg_l*4-2)
    context.fillText(option.arrtxt.lt_6/10000+'万', 2, yg_l*4+30)
    context.fillText(option.arrtxt.lt_7/10000+'万', 2, yg_l*5+30)
    context.fillText(option.arrtxt.lt_8, 2, yg_l*4+14);
    context.fillText(option.arrtxt.lt_9, 2+w/4*4-46, yg_l*4+14);
    //画框
    context.beginPath()
    context.setStrokeStyle("#000000");
    context.rect(0, yg_l*4+20, w, yg_l*2);
    context.stroke();
    context.closePath();
    //画蓝线
    context.beginPath()
    ///context.setFillStyle("#0D97FF");
    var _h = parseFloat((yg_l*4)/(option.arrtxt.lt_1-option.arrtxt.lt_5));
    var _w = w/option.arrprc.length;
    context.setStrokeStyle("#0D97FF");
    context.moveTo(0,yg_l*4)
    for(var i = 0 ; i<option.arrprc.length;i++)
    {
      var x=i*_w;
      var y = ((yg_l*4)-parseFloat(option.arrprc[i].last-option.arrtxt.lt_5)*_h);
      context.lineTo(x,y);  
      x=null;y=null;
    }
    i=null;x=null;y=null;
    context.stroke();
    context.closePath();
    //ma5
    context.beginPath()
    context.setStrokeStyle("#C6CB4D");
    var qd=option.arrprc.length%5;
    context.moveTo(_w*qd,(yg_l*4)-parseFloat(option.arrprc[qd].pc-option.arrtxt.lt_5)*_h);
    var arrma=0;
    for(var i = qd ; i<option.arrprc.length;i++)
    {
      var x=i*_w;
      var j=arrma + option.arrprc[i].pc;
      if(i%5==0)
      {
        var y = ((yg_l*4)-parseFloat(j-option.arrtxt.lt_5)*_h);
         j=0;
         arrma=0;
         context.lineTo(x,y);
      }
      x=null;y=null;
    }
    i=null;x=null;y=null;arrma=null;j=null;qd=null
    context.stroke();
    context.closePath();
    //ma10
    context.beginPath()
    context.setStrokeStyle("#6F5DC3");
    var qd=option.arrprc.length%10;
    context.moveTo(_w*qd,(yg_l*4)-parseFloat(option.arrprc[qd].pc-option.arrtxt.lt_5)*_h);
    var arrma=0;
    for(var i = qd ; i<option.arrprc.length;i++)
    {
      var x=i*_w;
      var j=arrma + option.arrprc[i].pc;
      if(i%10==0)
      {
        var y = ((yg_l*4)-parseFloat(j-option.arrtxt.lt_5)*_h);
         j=0;
         arrma=0;
         context.lineTo(x,y);
      }
      x=null;y=null;
    }
    i=null;x=null;y=null;arrma=null;j=null;qd=null
    context.stroke();
    context.closePath();
    //ma30
    context.beginPath()
    context.setStrokeStyle("#AB86B2");
    var qd=option.arrprc.length%30;
    context.moveTo(_w*qd,(yg_l*4)-parseFloat(option.arrprc[qd].pc-option.arrtxt.lt_5)*_h);
    var arrma=0;
    for(var i = qd ; i<option.arrprc.length;i++)
    {
      var x=i*_w;
      var j=arrma + option.arrprc[i].pc;
      if(i%30==0)
      {
        var y = ((yg_l*4)-parseFloat(j-option.arrtxt.lt_5)*_h);
         j=0;
         arrma=0;
         context.lineTo(x,y);
      }
      x=null;y=null;
    }
    i=null;x=null;y=null;arrma=null;j=null;qd=null
    context.stroke();
    context.closePath();
    //画柱形图
    var _fh=parseFloat((yg_l*2)/(option.arrtxt.lt_6/10000));
    for(var c = 0 ; c<option.arrfz.length;c++)
    {
      context.beginPath();
      context.setStrokeStyle("#0D97FF");
      var fx = c*_w;
      context.moveTo(fx,h);
      var fy =h-parseFloat((option.arrfz[c]/10000))*_fh;
      context.lineTo(fx,fy);
      context.stroke();
      context.closePath();
      fx=null;fy=null
    }

    wx.drawCanvas({
      canvasId: 'canvas2',
      actions:  context.getActions()
    })
  },
  rquote:function(data)
  {
    var _this=this;
    var opt={
            width:718,
            height:466,
            data:data
          }
      this.rdraw(opt);
  }
  }
module.exports = {
  formatTime: formatTime,
  setNav:setNav,
  graph:graph,
  pie:pie,
  formatDate:formatDate,
  showload:showload,
  hideload:hideload,
  quote:quote
}
