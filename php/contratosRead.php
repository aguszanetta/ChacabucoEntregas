<?php require_once "dash_top_usuarios.php" ?>

<!---- Contenido Principal ---->
<div class="container top">
	<h2>Contratos</h2>
</div>    
<br>  
<p id="rol"><?php if(isset($_SESSION['s_rol'])){echo $_SESSION['s_rol'];};?></p>
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaContratosRead" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>idContrato</th>
                        	<th>Número</th>
                            <th>Cliente</th>
                            <th>Cereal</th>
                            <th>Toneladas</th>
                            <th>Netos Sumados</th>
                            <th>Netos Finales Sumados</th>
                            <th>Comprador</th>
                            <th>Corredor</th>                            
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>               
            </div>
        </div>
    </div>  
</div>

<?php require_once "dash_bottom.php" ?>