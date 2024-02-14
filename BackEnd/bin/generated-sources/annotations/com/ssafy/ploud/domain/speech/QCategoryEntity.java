package com.ssafy.ploud.domain.speech;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCategoryEntity is a Querydsl query type for CategoryEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCategoryEntity extends EntityPathBase<CategoryEntity> {

    private static final long serialVersionUID = -828748394L;

    public static final QCategoryEntity categoryEntity = new QCategoryEntity("categoryEntity");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath name = createString("name");

    public QCategoryEntity(String variable) {
        super(CategoryEntity.class, forVariable(variable));
    }

    public QCategoryEntity(Path<? extends CategoryEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCategoryEntity(PathMetadata metadata) {
        super(CategoryEntity.class, metadata);
    }

}

