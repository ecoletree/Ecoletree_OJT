<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<!-- 
Template Name:  SmartAdmin Responsive WebApp - Template build with Twitter Bootstrap 4
Version: 4.5.1
Author: Sunnyat A.
Website: http://gootbootstrap.com
Purchase: https://wrapbootstrap.com/theme/smartadmin-responsive-webapp-WB0573SK0?ref=myorange
License: You must have a valid license purchased only from wrapbootstrap.com (link above) in order to legally use this theme for your project.
-->
<html lang="en">
    <head>
        <title>
            EcoleTree
        </title>
        
        <!-- CSS ================================================== -->
		<c:import url="/include.commonHeader.sp" charEncoding="UTF-8" />
		
		<!-- JavaScript ================================================== -->
		<c:import url="/include.commonPlugin.sp" charEncoding="UTF-8" />
    </head>
    
    <body class="mod-bg-1 ">
    <!-- alert 모달 -->
	<c:import url="/common.alert.sp" charEncoding="UTF-8" />
        <!-- BEGIN Page Wrapper -->
        <div class="page-wrapper">
            <div class="page-inner">
                <!-- BEGIN Left Aside -->
                <aside class="page-sidebar">
               		<c:import url="/layout.menu.sp" charEncoding="UTF-8" />
                </aside>
                <!-- END Left Aside -->
                
                <div class="page-content-wrapper">
                    <!-- BEGIN Page Header -->
<%--                     <tiles:insertAttribute name="serviceHeader" /> --%>
                    <!-- END Page Header -->
                    
                    <!-- BEGIN Page Content -->
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                        <tiles:insertAttribute name="serviceBody" />
                    </main>
                    <!-- this overlay is activated only when mobile menu is triggered -->
                    <div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div> <!-- END Page Content -->
                   
                    <!-- BEGIN Page Footer -->
<%--                     <tiles:insertAttribute name="serviceFooter" /> --%>
                    <!-- END Page Footer -->
                </div>
            </div>
        </div>
        
        <!-- END Page Wrapper -->
       
        <script src="${cp }/resources/smartadmin/js/app.bundle.js"></script>
        <!--This page contains the basic JS and CSS files to get started on your project. If you need aditional addon's or plugins please see scripts located at the bottom of each page in order to find out which JS/CSS files to add.-->
    </body>
    <!-- END Body -->
</html>
