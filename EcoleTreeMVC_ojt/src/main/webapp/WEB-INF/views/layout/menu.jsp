					<div class="page-logo">
                        <a href="#" class="page-logo-link press-scale-down d-flex align-items-center position-relative" data-toggle="modal" data-target="#modal-shortcut">
                            <img src="${cp }/resources/smartadmin/img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo">
                            <span class="page-logo-text mr-1">EcoleTree</span>
                            <span class="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
                            <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
                        </a>
                    </div>
                    <!-- 
                     여기부터 좌측 메뉴 메뉴 고정 위치에 따라 위 또는 좌측이 될 수 있음 
                    BEGIN PRIMARY NAVIGATION -->
                    <nav id="js-primary-nav" class="primary-nav" role="navigation">
                        <ul id="js-nav-menu" class="nav-menu">
                            <li class="active">
                                <a href="#" title="Category" data-filter-tags="category">
                                    <i class="fal fa-file"></i>
                                    <span class="nav-link-text" data-i18n="nav.category">JS LIBRARY SAMPLES</span>
                                </a>
                                <ul>
                                    <li>
                                        <a href="${cp }/datePicker" title="Menu child" data-filter-tags="utilities menu child">
                                            <span class="nav-link-text" data-i18n="nav.utilities_menu_child">Date Picker</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="active">
                                <a href="#" title="Category" data-filter-tags="category">
                                    <i class="fal fa-file"></i>
                                    <span class="nav-link-text" data-i18n="nav.category">사원관리</span>
                                </a>
                                <ul>
                                	<li>
                                        <a href="${cp }/emp/list" title="Menu child" data-filter-tags="utilities menu child">
                                            <span class="nav-link-text" data-i18n="nav.utilities_menu_child">사원 검색</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="${cp }/emp/create" title="Menu child" data-filter-tags="utilities menu child">
                                            <span class="nav-link-text" data-i18n="nav.utilities_menu_child">사원 생성</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            
                        </ul>
                    </nav>
