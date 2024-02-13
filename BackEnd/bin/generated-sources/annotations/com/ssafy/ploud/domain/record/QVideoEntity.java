package com.ssafy.ploud.domain.record;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QVideoEntity is a Querydsl query type for VideoEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVideoEntity extends EntityPathBase<VideoEntity> {

    private static final long serialVersionUID = 82999864L;

    public static final QVideoEntity videoEntity = new QVideoEntity("videoEntity");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> playTime = createNumber("playTime", Integer.class);

    public final StringPath videoPath = createString("videoPath");

    public QVideoEntity(String variable) {
        super(VideoEntity.class, forVariable(variable));
    }

    public QVideoEntity(Path<? extends VideoEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QVideoEntity(PathMetadata metadata) {
        super(VideoEntity.class, metadata);
    }

}

